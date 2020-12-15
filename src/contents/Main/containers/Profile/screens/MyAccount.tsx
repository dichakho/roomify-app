import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Image, Avatar, AppModal, Button, ImagePicker, Input,
} from '@components';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { TObjectRedux } from '@utils/redux';
import { Icon, Overlay } from 'react-native-elements';
import { Color } from '@themes/Theme';
import NavigationService from '@utils/navigation';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Dimensions } from 'react-native';
import { cloudinaryUploadSingle } from '@utils/functions';
import _ from 'lodash';
import { clearDataUpdate, getProfile, updateProfile } from '../redux/slice';
import { getProfileSelector, updateProfileSelector } from '../redux/selector';

const { width } = Dimensions.get('window');
interface Props {
  loginSelectorData: TObjectRedux;
  updateSelfInfo: (data: any) => any;
  update: any;
  me: any;
  getSelfInfo: () => any;
  clearUpdate: () => any;

}

interface State {
  modalIsVisible: boolean;
  checkNull: Array<string>;
  loadingUpload: boolean;
}
class MyAccount extends PureComponent<Props, State> {
  avatar: any;

  username: any;

  fullName: any;

  email: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      modalIsVisible: false,
      checkNull: [],
      loadingUpload: false,
    };
  }

  componentDidMount() {
    const { getSelfInfo, clearUpdate } = this.props;
    getSelfInfo();
    clearUpdate();
  }

  renderTitle = () => {
    const { me: { data } } = this.props;
    return (
      <QuickView>
        <Text type="title" bold>{data?.fullName}</Text>
      </QuickView>
    );
  };

  renderRightComponent = () => {
    const { clearUpdate } = this.props;
    return (
      <QuickView onPress={() => {
        this.setState({ modalIsVisible: true });
        clearUpdate();
      }}
      >
        <Icon name="edit" type="antdesign" />
      </QuickView>
    );
  };

  toggleModal = () => {
    this.setState((prevState: any) => ({ modalIsVisible: !prevState.modalIsVisible }));
  };

  handleSaveInfo = async () => {
    const { updateSelfInfo, me: { data } } = this.props;
    const fullName = this.fullName.getText();
    const email = this.email.getText();
    // const username = this.username.getText();
    const avatar = this.avatar.getDataImage();
    console.log('123123', fullName, email, avatar);
    let imgUrl = '';
    if (!_.isNull(avatar)) {
      this.setState({ loadingUpload: true });
      const resultUpload: any = await cloudinaryUploadSingle(avatar);
      imgUrl = resultUpload.url;
      this.setState({ loadingUpload: false });
    }
    // const result: any = await cloudinaryUploadSingle(avatar);
    const checkNull = [];
    if (!email) {
      checkNull.push('email');
    }
    if (!fullName) {
      checkNull.push('fullName');
    }
    this.setState({ checkNull });
    const payload: any = {};
    if (imgUrl !== '') {
      payload.avatar = imgUrl;
    }
    if (fullName !== data?.fullName) {
      payload.fullName = fullName;
    }
    if (email !== data?.email) {
      payload.email = email;
    }
    if (checkNull.length === 0 && payload.length !== 0) {
      // const payload: any = {
      //   fullName,
      //   email,
      // };
      // if (imgUrl !== '') {
      //   payload.avatar = imgUrl;
      // }
      updateSelfInfo(payload);
    }
  };

  renderNotification = () => {
    const {
      update: { data, error },
      clearUpdate,
    } = this.props;
    console.log('data', data);
    console.log('error', error);

    if (!error && !_.isEmpty(data)) {
      return (
        <Overlay isVisible>
          <QuickView>
            <Text center bold type="title" color={lightPrimaryColor} marginTop={32}>
              Thông báo
            </Text>
            <Text center fontSize={16} marginTop={12} marginHorizontal={30}>
              Cập nhật thành công
            </Text>
            <QuickView
              center
              paddingHorizontal={20}
            // width={250}
            // marginHorizontal={50}
            // center
              marginTop={12}
            >
              <Button
                outline
                title="Đóng"
                width={110}
                onPress={() => {
                  this.toggleModal();
                  clearUpdate();
                  NavigationService.goBack();
                }}
              />

            </QuickView>
          </QuickView>
        </Overlay>
      );
    }
    if (error && _.isEmpty(data)) {
      return (
        <QuickView
          height={50}
          backgroundColor="rgba(255,50,50,0.2)"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={16} color="#FF3232">
            {error.message}
          </Text>
        </QuickView>
      );
    }
    return <QuickView height={20} />;
    // return (
    //   <Overlay isVisible>
    //     <QuickView>
    //       <Text center bold type="title" color={lightPrimaryColor} marginTop={32}>
    //         Thông báo
    //       </Text>
    //       <Text center fontSize={16} marginTop={12} marginHorizontal={30}>
    //         Cập nhật thành công
    //       </Text>
    //       <QuickView
    //         center
    //         paddingHorizontal={20}
    //         // width={250}
    //         // marginHorizontal={50}
    //         // center
    //         marginTop={12}
    //       >
    //         <Button
    //           outline
    //           title="Đóng"
    //           width={110}
    //           onPress={() => NavigationService.goBack()}
    //         />

    //       </QuickView>
    //     </QuickView>
    //   </Overlay>
    // );
  };

  renderEditProfile = () => {
    const { me: { data }, update: { loading: loadingUpdate } } = this.props;
    console.log('🚀 ~ file: MyAccount.tsx ~ line 163 ~ MyAccount ~ data', data);
    const { checkNull, loadingUpload } = this.state;
    const hasErrors = (key: any) => (checkNull.includes(key) ? { borderColor: 'red', borderWidth: 1 } : null);
    return (
      <QuickView padding={20}>
        <Text bold>Ảnh đại diện</Text>
        <ImagePicker
          // loadingUpload={loadingUpload}
          defaultImage={data?.avatar}
          containerStyle={{ marginTop: 10, marginBottom: 0 }}
          parent={this}
          ref={(ref) => {
            this.avatar = ref;
          }}
          uploadImgContainer={{
            width: '35%',
            height: 120,
            backgroundColor: '#E6E9F0',
          }}
          icon={{
            name: 'plus', color: '#DC2F2F', size: 20, type: 'entypo',
          }}
          imgUploaded={{ width: 120, height: 120 }}
          textDescription="Tải lên"
          textDesStyle={{ color: lightPrimaryColor }}
        />
        <QuickView marginTop={25}>
          <Text bold>Họ và tên</Text>
          <Input
            value={data?.fullName}
            fontSize={14}
            containerStyle={hasErrors('fullName')}
            errorMessage="hello"
            ref={(ref: any) => {
              this.fullName = ref;
            }}
            marginVertical={10}
            height={40}
            placeholder="Nhập họ và tên"
          />
        </QuickView>
        {/* <QuickView marginTop={25}>
          <Text bold>Tên đăng nhập</Text>
          <Input
            value={data?.username}
            fontSize={14}
            // containerStyle={hasErrors('lastName')}
            errorMessage="hello"
            ref={(ref: any) => {
              this.username = ref;
            }}
            marginVertical={10}
            height={40}
            placeholder="Nhập họ và tên"
          />
        </QuickView> */}
        <QuickView marginTop={25}>
          <Text bold>Email</Text>
          <Input
            value={data?.email}
            fontSize={14}
            containerStyle={hasErrors('email')}
            errorMessage="hello"
            ref={(ref: any) => {
              this.email = ref;
            }}
            marginVertical={10}
            height={40}
            placeholder="Nhập họ và tên"
          />
        </QuickView>
        {this.renderNotification()}
        <QuickView marginTop={20}>
          <Button
            loading={loadingUpload || loadingUpdate}
            title="Lưu"
            width={(width / 10) * 4}
            onPress={() => this.handleSaveInfo()}
            center
          />
        </QuickView>
      </QuickView>
    );
  };

  render() {
    const {
      me: { data },
      update: { loading: loadingUpdate },
      // me,
    } = this.props;
    // console.log('🚀 ~ file: MyAccount.tsx ~ line 240 ~ MyAccount ~ render ~ me', me);
    const { modalIsVisible } = this.state;

    return (
      <Container style={{ borderWidth: 1, borderColor: 'red' }} dismissKeyboard>
        <>
          <AppModal
            type="bottomhalf"
            isVisibleProps={modalIsVisible}
            // title="hello"
            // content="hi hi hi"
            onClick={this.toggleModal}
            scroll
            viewComponent={this.renderEditProfile()}
            heightLevel={9}
          />

          <QuickView
          // paddingHorizontal={20}
            backgroundImage={{
              source: require('@assets/images/myAccount.png'),
            }}
          >

            <Header
              leftColor={Color.black}
              backIcon
              backgroundColor="transparent"
              centerComponent={this.renderTitle()}
              rightComponent={this.renderRightComponent()}
            />
            <QuickView marginBottom={50} marginTop={20} center>
              <Avatar
                size="xlarge"
                rounded
                source={{
                  uri:
                  data?.avatar,
                }}
                title="M"
                marginBottom={10}
              />
            </QuickView>
            <QuickView paddingHorizontal={20}>
              <QuickView justifyContent="space-between" row>
                <Text>Tên đăng nhập:</Text>
                <Text bold>{data?.username}</Text>
              </QuickView>
              <QuickView marginTop={20} justifyContent="space-between" row>
                <Text>Email:</Text>
                <Text bold>{data?.email}</Text>
              </QuickView>
              <QuickView marginTop={20} justifyContent="space-between" row>
                <Text>Liên hệ:</Text>
                <Text bold>{data?.phone}</Text>
              </QuickView>
              <QuickView marginTop={20} justifyContent="space-between" row>
                <Text>Trạng thái:</Text>
                <Text bold>{data?.status}</Text>
              </QuickView>
            </QuickView>
          </QuickView>
        </>

      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loginSelectorData: parseObjectSelector(applyObjectSelector(loginSelector, state)),
  update: parseObjectSelector(applyObjectSelector(updateProfileSelector, state)),
  me: parseObjectSelector(applyObjectSelector(getProfileSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  updateSelfInfo: (data: any) => dispatch(updateProfile({ data })),
  getSelfInfo: () => dispatch(getProfile({})),
  clearUpdate: () => dispatch(clearDataUpdate()),

});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
