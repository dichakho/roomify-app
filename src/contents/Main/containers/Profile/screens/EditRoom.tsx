import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body, Button, Input as AppInput, ImagePicker, FlatList, Image,
} from '@components';
import { Color } from '@themes/Theme';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon, Input, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { TArrayRedux, TObjectRedux, TQuery } from '@utils/redux';
import {
  applyArraySelector, applyObjectSelector, parseArraySelector, parseObjectSelector,
} from '@utils/selector';
import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { post } from '@utils/api';
import NavigationService from '@utils/navigation';
import { amenitiesGetList } from '../redux/slice';
import { amenitiesSelector } from '../redux/selector';
import { roomGetDetail, roomGetList } from '../../Explore/redux/slice';
import { detailRoomSelector } from '../../Explore/redux/selector';

interface Props {
  getAmenities: (query?: TQuery) => any;
  amenities: TArrayRedux;
  route?: any;
  getListRoom: (id: number, query?: TQuery) => any;
  getDetail: (id: number) => any;
  detail: TObjectRedux;
}
interface State {
  data: Array<any>;
  description: string;
  checkNull: boolean;
  loading: boolean;
  overlayIsVisible: boolean;
  arrayImage: Array<any>;
  haveChange: boolean;

}
class EditRoom extends PureComponent<Props, State> {
  title: any;

  description: any;

  price: any;

  images: any;

  area: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      description: '',
      checkNull: false,
      loading: false,
      overlayIsVisible: false,
      arrayImage: [],
      haveChange: false,

    };
  }

  componentDidMount() {
    const { getAmenities, getDetail, route: { params } } = this.props;
    getAmenities({ fields: 'id,name,iconName,iconType', limit: 100 });
    getDetail(params);
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.data.length === 0 && nextProps?.amenities?.data !== 0 && nextProps?.detail?.data?.amenities !== 0) {
      const data = [...nextProps?.amenities?.data];
      const amenities = [...nextProps?.detail?.data?.amenities].map((a) => a.id);
      return { data: data.map((d) => ({ ...d, checked: _.includes(amenities, d.id) })) };
    }
    if (prevState.arrayImage.length === 0) {
      const data = [...nextProps?.detail?.data?.images];
      return { arrayImage: data.map((i: any) => ({ uri: i })) };
    }
    return { ...prevState };
  }

  toggleItem = (id: number) => {
    const { data } = this.state;
    const newArray = [...data];
    newArray.forEach((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
    });
    this.setState({ data: newArray });
  };

  renderItem = ({ item }: { item: any }) => (
    <QuickView
      backgroundColor={item.checked ? Color.white : '#E6E9F0'}
      onPress={() => this.toggleItem(item.id)}
      flex={1}
      marginHorizontal={5}
      marginVertical={10}
      style={{
        borderWidth: 1,
        borderColor: item.checked ? lightPrimaryColor : '#E6E9F0',
      }}
      borderRadius={10}
      padding={10}
      row
    >
      <QuickView flex={1}>
        <Icon
          color={item.checked ? lightPrimaryColor : Color.grey6}
          name={item.iconName}
          type={item.iconType}
          size={20}
        />
      </QuickView>
      <QuickView flex={4}>
        <Text
          numberOfLines={1}
          color={item.checked ? lightPrimaryColor : Color.grey6}
        >
          {item.name}
        </Text>
      </QuickView>
    </QuickView>
  );

  cloudinaryUpload = async () => {
    const img = this.images.getDataImage();
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

  handleCreateRoom = async () => {
    this.setState({ loading: true });
    const { route } = this.props;

    const { description, data } = this.state;

    // console.log();
    const title = this.title.getText();
    const price = this.price.getText();
    const area = this.area.getText();
    const amenityIds = data.filter((d) => d.checked).map((m) => m.id);
    const img = this.images.getDataImage();
    if (_.isEmpty(img) || _.isNull(title) || _.isNull(price) || _.isNull(area) || _.isEmpty(amenityIds)) {
      this.setState({ checkNull: true });
    } else {
      // const imgUrl = await this.cloudinaryUpload();
      const payload = {
        name: title,
        price: +price,
        description,
        area: +area,
        // images: imgUrl,
        propertyId: route.params,
        amenityIds,
      };
      console.log('payload', payload);
      try {
        const result = await post('/rooms', payload);
        if (result) {
          this.setState({ loading: false, overlayIsVisible: true });
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    // console.log('titleeeeee', title, price, amenityIds, description, registrationToken);
  };

  renderItemImage = ({ item }: { item: any}) => {
    // const { detail: { data } } = this.props;
    const { arrayImage } = this.state;
    return (
      <QuickView marginRight={10}>
        <Image
          multipleSources={arrayImage}
          viewEnable
          height={120}
          width={120}
          source={{ uri: item }}
        />
      </QuickView>
    );
  };

  render() {
    const {
      data, checkNull, overlayIsVisible, loading, haveChange,
    } = this.state;
    const { route: { params }, getListRoom, detail: { data: detailData } } = this.props;
    console.log('🚀 ~ file: EditRoom.tsx ~ line 197 ~ EditRoom ~ render ~ detail', detailData);
    // console.log('🚀 ~ file: EditRoom.tsx ~ line 193 ~ EditRoom ~ render ~ params', params);

    return (
      <Container>
        <Header backIcon title="Cập nhật phòng" />
        <Overlay
          isVisible={overlayIsVisible}
          overlayStyle={{ borderRadius: 8, width: '80%' }}
        >
          <QuickView>
            <Text center color={lightPrimaryColor} type="title" bold>Thông báo</Text>
            <Text marginVertical={10} center>
              Tạo phòng thành công
            </Text>
            <QuickView paddingHorizontal={80}>
              <Button
                title="Đóng"
                onPress={() => {
                  getListRoom(params);
                  this.setState({ overlayIsVisible: false });
                  NavigationService.goBack();
                }}
              />
            </QuickView>
          </QuickView>
        </Overlay>
        <Body scroll dismissKeyboard>
          <QuickView scroll paddingHorizontal={20} flex={1}>
            {/* Tiêu đề phòng */}
            <AppInput
              value={detailData?.name}
              labelProps={{ marginTop: 20 }}
              inputStyle={{ fontSize: 16 }}
              ref={(ref: any) => { this.title = ref; }}
              containerStyle={{
                paddingHorizontal: 0,
                // marginBottom: 20,
                backgroundColor: Color.white,
                borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
              }}
              inputContainerStyle={{
                borderColor: Color.black,
                borderBottomWidth: 1,
              // ...hasErrors('description'),
              }}
              label="Tiêu đề phòng"
              showLabel
              validationField="empty"
              errorMessage="Nhập tiêu đề phòng"
          // labelStyle={{
          //   color: lightComponentColor.textColor,
          //   fontWeight: 'normal',
          // }}
              placeholder="Phòng sạch, đẹp, có gác ..."
            />
            {/* Nội dung mô tả */}
            <Input
              value={detailData?.description}
              onChangeText={(value: string) => this.setState({ description: value })}
            // ref={(ref: any) => { this.title = ref; }}
              multiline
              containerStyle={{ paddingHorizontal: 0, borderColor: 'red' }}
              inputContainerStyle={{
                borderColor: Color.black,
                paddingHorizontal: 10,
                // ...hasErrors('description'),
              }}
              label="Nội dung mô tả"
              labelStyle={{
                color: lightComponentColor.textColor,
                fontWeight: 'normal',
                marginTop: 20,
                marginBottom: 10,
              }}
              placeholder="Môi trường sống văn hóa, sạch sẽ ..."
              inputStyle={{ fontSize: 16 }}
              // inputContainerStyle={{  }}
              placeholderTextColor={lightComponentColor.textColorSecondary}
            />

            {/* Giá tiền */}
            <AppInput
              value={detailData?.price}
              keyboardType="number-pad"
              // labelProps={{ marginTop: 20 }}
              inputStyle={{ fontSize: 16 }}
              ref={(ref: any) => { this.price = ref; }}
              containerStyle={{
                paddingHorizontal: 0,
                // marginBottom: 20,
                backgroundColor: Color.white,
                borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
              }}
              inputContainerStyle={{
                borderColor: Color.black,
                borderBottomWidth: 1,
              // ...hasErrors('description'),
              }}
              label="Giá tiền"
              showLabel
              placeholder="Nhập giá tiền"
              validationField="empty"
              errorMessage="Nhập giá tiền"
            />

            {/* Diện tích */}
            <AppInput
              value={detailData?.area}
              keyboardType="number-pad"
              // labelProps={{ marginTop: 20 }}
              inputStyle={{ fontSize: 16 }}
              ref={(ref: any) => { this.area = ref; }}
              containerStyle={{
                paddingHorizontal: 0,
                // marginBottom: 20,
                backgroundColor: Color.white,
                borderWidth: 0,
              // borderBottomWidth: 1,
              // borderColor: 'red',
              }}
              inputContainerStyle={{
                borderColor: Color.black,
                borderBottomWidth: 1,
              // ...hasErrors('description'),
              }}
              labelProps={{ marginTop: 20 }}
              label="Diện tích"
              showLabel
              placeholder="Nhập diện tích"
              validationField="empty"
              errorMessage="Nhập diện tích"
            />
            {/* Hình ảnh */}
            <QuickView marginTop={10}>
              <Text marginVertical={10}>Hình ảnh</Text>
              <FlatList showsHorizontalScrollIndicator={false} horizontal data={detailData?.images} renderItem={this.renderItemImage} />
              {/* {detailData?.images.map((i:string) => <Image source={{ uri: i }} />)} */}
              {/* <ImagePicker
                multi
                uploadImgContainer={{
                  width: 120,
                  height: 120,
                  backgroundColor: '#E6E9F0',
                  borderRadius: 10,
                }}

                ref={(ref) => {
                  this.images = ref;
                }}
                imgUploaded={{ width: 120, height: 120 }}
              /> */}
            </QuickView>

            {/* Tiện ích */}
            <QuickView>
              <Text marginVertical={10}>Tiện ích</Text>
              <QuickView row justifyContent="space-between" style={{ flexWrap: 'wrap' }}>
                {data.map((item) => (
                  <QuickView
                    key={item?.id}
                    backgroundColor={item.checked ? Color.white : '#E6E9F0'}
                    onPress={() => this.toggleItem(item.id)}
                  // flex={1}
                    width="45%"
                    marginHorizontal={5}
                    marginVertical={10}
                    style={{
                      borderWidth: 1,
                      borderColor: item.checked ? lightPrimaryColor : '#E6E9F0',
                    }}
                    borderRadius={10}
                    padding={10}
                    row
                  >
                    <QuickView flex={1}>
                      <Icon
                        color={item.checked ? lightPrimaryColor : Color.grey6}
                        name={item.iconName}
                        type={item.iconType}
                        size={20}
                      />
                    </QuickView>
                    <QuickView flex={4}>
                      <Text
                        numberOfLines={1}
                        color={item.checked ? lightPrimaryColor : Color.grey6}
                      >
                        {item.name}
                      </Text>
                    </QuickView>
                  </QuickView>
                ))}
              </QuickView>
            </QuickView>
            {checkNull ? <Text center error>Vui lòng nhập các trường còn trống </Text> : null}
            <Button disabled={!haveChange} loading={loading} marginTop={20} title="Cập nhật" onPress={this.handleCreateRoom} />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  amenities: parseArraySelector(applyArraySelector(amenitiesSelector, state)),
  detail: parseObjectSelector(applyObjectSelector(detailRoomSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getAmenities: (query?: TQuery) => dispatch(amenitiesGetList({ query })),
  getListRoom: (id: number, query?: TQuery) => dispatch(roomGetList({ id, query })),
  getDetail: (id: number) => dispatch(roomGetDetail({ id })),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom);
