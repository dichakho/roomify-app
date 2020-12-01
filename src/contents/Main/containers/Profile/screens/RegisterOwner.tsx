/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Container, Header, Body, Input, Image, ImagePicker, Button, Text,
} from '@components';
// import { Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { cloudinaryUploadSingle } from '@utils/functions';
import _ from 'lodash';
import {
  applyArraySelector, applyObjectSelector, parseArraySelector, parseObjectSelector,
} from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { Overlay } from 'react-native-elements';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import NavigationService from '@utils/navigation';
import { post } from '@utils/api';
import { registerOwner } from '../redux/slice';
import { registerOwnerSelector } from '../redux/selector';

interface Props {
  register: (data: any) => any;
  registerStatus: TObjectRedux;
}
interface State {
  checkNull: boolean;
  loading: boolean;
  overlayIsVisible: boolean;
}
class RegisterOwner extends PureComponent<Props, State> {
  name: any;

  id: any;

  imgs : any;

  constructor(props: Props) {
    super(props);
    this.state = {
      checkNull: false,
      loading: false,
      overlayIsVisible: false,
    };
  }

  handleOnPress = () => {
    console.log('!!!!', this.imgs.getDataImage());
  };

  cloudinaryUpload = async () => {
    const img = this.imgs.getDataImage();
    const urlImgages: Array<any> = [];
    await Promise.all(
      img.map(async (i: any) => {
        try {
          await RNFetchBlob.fetch(
            'POST',
            'https://api.cloudinary.com/v1_1/dichakho/image/upload?upload_preset=roomify',
            {
              'Content-Type': 'multipart/form-data',
            },
            [
              {
                name: 'file',
                filename: i.fileName,
                data: RNFetchBlob.wrap(i.uri),
              },
            ],
          )
            .then((res) => res.json())
            .then((response) => {
              console.log('Cloudinary response:', response);
              urlImgages.push(response.url);
            });
        } catch (err) {
          console.log('Upload Error:', err);
        }
      }),
    );
    return urlImgages;
  };

  handleRegisterOwner = async () => {
    this.setState({ loading: true });
    const img = this.imgs.getDataImage();
    if (_.isEmpty(img) || _.isNull(this.id.getText()) || _.isNull(this.name.getText())) {
      this.setState({ checkNull: true });
    } else {
      const imgUrl = await this.cloudinaryUpload();
      const payload = {
        IDNumber: this.id.getText(),
        householdRegistrationImgs: imgUrl,
        nameOwner: this.name.getText(),
      };
      const result = await post('/owner-registration', payload);
      if (result.status === 'PENDING') {
        this.setState({ loading: false, overlayIsVisible: true });
      }
      // register(payload);
      // console.log('payload', payload);
    }
  };

  render() {
    const { checkNull, loading, overlayIsVisible } = this.state;
    const { registerStatus } = this.props;
    return (
      <Container>
        <Overlay isVisible={overlayIsVisible} overlayStyle={{ borderRadius: 8, width: '80%' }}>
          <QuickView>
            <Text center color={lightPrimaryColor} type="title" bold>Thông báo</Text>
            <Text marginVertical={10} center>
              {`Yêu cầu của bạn sẽ được quản trị viên
xét duyệt trong thời gian sớm nhất`}
            </Text>
            <QuickView paddingHorizontal={80}>
              <Button
                title="Đóng"
                onPress={() => {
                  this.setState({ overlayIsVisible: false });
                  NavigationService.goBack();
                }}
              />
            </QuickView>
          </QuickView>
        </Overlay>
        <Header backIcon title="Đăng ký làm chủ nhà" />
        <Body scroll>
          <Input ref={(ref: any) => { this.name = ref; }} validationField="empty" placeholder="Nhập tên chủ hộ" showLabel labelProps={{ marginTop: 10 }} label="Tên chủ hộ" />
          <Input ref={(ref: any) => { this.id = ref; }} keyboardType="number-pad" validationField="id" placeholder="Nhập số CMND" showLabel labelProps={{ marginTop: 10 }} label="Số chứng minh nhân dân" />
          {/* <Image viewEnable source={{ uri: 'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg' }} /> */}

          <QuickView height={180} marginTop={10}>
            <Text marginVertical={10}>Hình ảnh sổ hộ khẩu</Text>
            <ImagePicker
              multi
              uploadImgContainer={{
                width: 120,
                height: 120,
                backgroundColor: '#E6E9F0',
                borderRadius: 10,
              }}
              imgUploaded={{ width: 120, height: 120 }}
              ref={(ref) => {
                this.imgs = ref;
              }}
            />
          </QuickView>
          {checkNull ? <Text center error>Vui lòng nhập các trường còn trống </Text> : null}
          {/* <Button title="Gửi" onPress={() => cloudinaryUploadSingle(this.imgs.getDataImage())} /> */}
          <Button loading={loading} marginVertical={10} title="Gửi" onPress={this.handleRegisterOwner} />
        </Body>

      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  registerStatus: parseObjectSelector(applyObjectSelector(registerOwnerSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  register: (data: any) => dispatch(registerOwner({ data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOwner);
