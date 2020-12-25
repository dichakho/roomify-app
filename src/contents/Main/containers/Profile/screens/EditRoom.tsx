/* eslint-disable no-console */
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
import { post, put } from '@utils/api';
import NavigationService from '@utils/navigation';
import { ActivityIndicator, Switch } from 'react-native';
import { amenitiesGetList } from '../redux/slice';
import { amenitiesSelector } from '../redux/selector';
import { roomGetDetail, roomGetList } from '../../Explore/redux/slice';
import { detailRoomSelector } from '../../Explore/redux/selector';
import { RoomStatus } from '../redux/constant';

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
  title: string | null;
  description: string | null;
  price: string | null;
  area: string | null;
  checkNull: boolean;
  loading: boolean;
  overlayIsVisible: boolean;
  arrayImage: Array<any>;
  haveChange: boolean;
  isEnabled: boolean | null;

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
      description: null,
      title: null,
      price: null,
      area: null,
      checkNull: false,
      loading: false,
      overlayIsVisible: false,
      arrayImage: [],
      haveChange: false,
      isEnabled: null,

    };
  }

  componentDidMount() {
    const { getAmenities, getDetail, route: { params } } = this.props;
    getAmenities({ fields: 'id,name,iconName,iconType', limit: 100 });
    getDetail(params);
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    let titleVar = prevState.title;
    let descriptionVar = prevState.description;
    let priceVar = prevState.price;
    let areaVar = prevState.area;
    let isEnabledVar = prevState.isEnabled;

    if (prevState.data.length === 0 && nextProps?.amenities?.data.length !== 0 && !_.isUndefined(nextProps?.detail?.data?.amenities) && nextProps?.detail?.data?.amenities.length !== 0) {
      const data = [...nextProps?.amenities?.data];
      const amenities = [...nextProps?.detail?.data?.amenities].map((a) => a.id);
      // amenities = amenities;
      return { data: data.map((d) => ({ ...d, checked: _.includes(amenities, d.id) })) };
    }
    if (prevState.arrayImage.length === 0 && !_.isUndefined(nextProps?.detail?.data?.images) && nextProps?.detail?.data?.images.length !== 0) {
      if (_.isNull(titleVar)) {
        titleVar = nextProps?.detail?.data?.name;
      }
      if (_.isNull(descriptionVar)) {
        descriptionVar = nextProps?.detail?.data?.description;
      }
      if (_.isNull(priceVar)) {
        priceVar = nextProps?.detail?.data?.price;
      }
      if (_.isNull(areaVar)) {
        areaVar = nextProps?.detail?.data?.area;
      }
      if (_.isNull(isEnabledVar)) {
        isEnabledVar = nextProps?.detail?.data?.status === 'OPEN';
      }
      const data = [...nextProps?.detail?.data?.images];
      return {
        arrayImage: data.map((i: any) => ({ uri: i })), title: titleVar, description: descriptionVar, price: priceVar, area: areaVar, isEnabled: isEnabledVar,
      };
    }

    return {
      ...prevState,
    };
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

  handleEditRoom = async () => {
    this.setState({ loading: true });
    const { route: { params } } = this.props;
    const {
      description, data, title, price, area, isEnabled,
    } = this.state;
    const { detail: { data: dataDetail } } = this.props;
    // console.log('title', title);
    // return 1;
    const payload: any = {};
    if (title !== dataDetail?.name) {
      payload.name = title;
    }
    if (description !== dataDetail?.description) {
      payload.description = description;
    }
    if (price !== dataDetail?.price) {
      payload.price = price;
    }
    if (area !== dataDetail?.area) {
      payload.area = area;
    }
    if (isEnabled !== dataDetail?.status) {
      payload.status = isEnabled ? RoomStatus.OPEN : RoomStatus.CLOSE;
    }
    const amenities = data.filter((d) => d.checked).map((m) => m.id);
    const amenitiesData = dataDetail?.amenities.map((d: any) => d.id);
    if (!_.isEmpty(_.difference(amenities, amenitiesData))) {
      payload.amenityIds = amenities;
    }
    // console.log('payload', payload);
    try {
      await put(`/rooms/${params}`, payload);
      this.setState({ overlayIsVisible: true, loading: false });
    } catch (error) {
      console.log('error', error);
      this.setState({ loading: false });
    }
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

  handleCheckChange = () => {
    let check = true;
    const {
      title, description, price, area, data, isEnabled,
    } = this.state;
    const { detail: { data: dataDetail } } = this.props;
    if (title !== dataDetail?.name && title?.length !== 0) {
      check = false;
    }
    if (description !== dataDetail?.description && description?.length !== 0) {
      check = false;
    }
    if (price !== dataDetail?.price && price?.length !== 0) {
      check = false;
    }
    if (area !== dataDetail?.area && area?.length !== 0) {
      check = false;
    }
    // const copyData = [...dataDetail?.amenities];
    const amenities = data?.filter((d) => d.checked);
    // const amenitiesData = copyData?.map((d: any) => d.id);
    if (amenities?.length !== dataDetail?.amenities?.length) {
      check = false;
    }

    const status = isEnabled ? RoomStatus.OPEN : RoomStatus.CLOSE;
    if (status !== dataDetail?.status) {
      check = false;
    }
    return check;
  };

  toggleIsEnabled = () => {
    this.setState((prevState: any) => ({ isEnabled: !prevState.isEnabled }));
  };

  render() {
    const {
      data, checkNull, overlayIsVisible, loading, title, area, price, description, isEnabled,
    } = this.state;
    const { route: { params }, getListRoom, detail: { data: detailData, loading: detailLoading } } = this.props;
    console.log('🚀 ~ file: EditRoom.tsx ~ line 285 ~ EditRoom ~ render ~ detailData', detailData);
    if (detailLoading) {
      return (
        <QuickView center flex={1}>
          <ActivityIndicator />
        </QuickView>
      );
    }
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
              Cập nhật phòng thành công
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
            <Input
              value={title || ''}
              onChangeText={(value: string) => this.setState({ title: value, haveChange: true })}
            // ref={(ref: any) => { this.title = ref; }}
              containerStyle={{ paddingHorizontal: 0, borderColor: 'red' }}
              inputContainerStyle={{
                borderColor: Color.black,
                paddingHorizontal: 10,
                // ...hasErrors('description'),
              }}
              label="Tiêu đề phòng"
              labelStyle={{
                color: lightComponentColor.textColor,
                fontWeight: 'normal',
                marginTop: 20,
                marginBottom: 10,
              }}
              placeholder="Môi trường sống văn hóa, sạch sẽ ..."
              inputStyle={{ fontSize: 16 }}
              placeholderTextColor={lightComponentColor.textColorSecondary}
            />
            {/* Nội dung mô tả */}
            <Input
              value={description || ''}
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
            <Input
              value={`${price}` || ''}
              onChangeText={(value: string) => this.setState({ price: value })}
            // ref={(ref: any) => { this.title = ref; }}
              containerStyle={{ paddingHorizontal: 0, borderColor: 'red' }}
              inputContainerStyle={{
                borderColor: Color.black,
                paddingHorizontal: 10,
                // ...hasErrors('description'),
              }}
              labelStyle={{
                color: lightComponentColor.textColor,
                fontWeight: 'normal',
                marginTop: 20,
                marginBottom: 10,
              }}
              inputStyle={{ fontSize: 16 }}
              placeholderTextColor={lightComponentColor.textColorSecondary}
              label="Giá tiền"
              placeholder="Nhập giá tiền"
              // errorMessage="Nhập giá tiền"
            />

            {/* Diện tích */}
            <Input
              value={area || ''}
              onChangeText={(value: string) => this.setState({ area: value })}
            // ref={(ref: any) => { this.title = ref; }}
              containerStyle={{ paddingHorizontal: 0, borderColor: 'red' }}
              inputContainerStyle={{
                borderColor: Color.black,
                paddingHorizontal: 10,
                // ...hasErrors('description'),
              }}
              labelStyle={{
                color: lightComponentColor.textColor,
                fontWeight: 'normal',
                marginTop: 20,
                marginBottom: 10,
              }}
              inputStyle={{ fontSize: 16 }}
              placeholderTextColor={lightComponentColor.textColorSecondary}
              label="Diện tích"
              placeholder="Nhập diện tích"
              // errorMessage="Nhập giá tiền"
            />

            <QuickView>
              <Text marginVertical={10}>Trạng thái (CLOSE/OPEN)</Text>
              <Switch
        // trackColor={{ false: '#767577', true: '#81b0ff' }}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        // ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleIsEnabled}
                value={isEnabled || false}
              />
            </QuickView>

            {/* Hình ảnh */}
            <QuickView marginTop={20}>
              <Text marginVertical={10}>Hình ảnh</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={detailData?.images}
                renderItem={this.renderItemImage}
              />
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
            <QuickView marginTop={20}>
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
            {/* {checkNull ? <Text center error>Vui lòng nhập các trường còn trống </Text> : null} */}
            <Button disabled={this.handleCheckChange()} loading={loading} marginTop={20} title="Cập nhật" onPress={this.handleEditRoom} />
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
