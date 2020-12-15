import React, { PureComponent } from 'react';
import {
  Text,
  QuickView,
  Header,
  ParallaxScrollView,
  Body,
  Container,
  Image,
  Avatar,
  Button,
} from '@components';
import { connect } from 'react-redux';
import { Color } from '@themes/Theme';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon, Overlay } from 'react-native-elements';
import NavigationService from '@utils/navigation';
import {
  Animated, FlatList, TouchableOpacity, Text as RNText,
} from 'react-native';
import { parallaxHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { applyArraySelector, applyObjectSelector, parseObjectSelector } from '@utils/selector';
import OverlayLoading from '@components/OverlayLoading';
import { TArrayRedux, TQuery } from '@utils/redux';
import { vndPriceFormat } from '@utils/functions';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import _ from 'lodash';
import rootStack from '@contents/routes';
import moment from 'moment';
import { propertyDetailSelector, roomsOfPropertySelector } from '../../Explore/redux/selector';
import {
  clearDetail, clearListRoom, propertyGetDetail, roomGetList,
} from '../../Explore/redux/slice';
import profileStack from '../routes';
import exploreStack from '../../Explore/routes';

interface Props {
  detail: any;
  getDetailProperty: (id: number) => any;
  route?: any;
  clear: () => any;
  getListRoom: (id: number, query?: TQuery) => any;
  roomsOfProperty: TArrayRedux;
  clearRoomList: () => any;
  navigation: any;
}
interface State {
  deleteOverlay: boolean;
  deleteRoomId: number;
}
class ManageDetailProperty extends PureComponent<Props, State> {
  swipe: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      deleteOverlay: false,
      deleteRoomId: 0,
    };
  }

  componentDidMount() {
    const {
      getDetailProperty,
      route: { params: { id } },
      clear,
      getListRoom,
      clearRoomList,
      navigation,
    } = this.props;
    // navigation.addListener('focus', () => {
    //   getListRoom(id);
    // });
    clear();
    clearRoomList();
    getDetailProperty(id);
    getListRoom(id);
  }

  renderRightComponent = () => {
    const { route: { params: { id } } } = this.props;
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate(profileStack.createRoom, id)}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          flexDirection: 'row',
          // flex: 1,
          // width: 40,
          // height: 40,
          borderRadius: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          // justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name="plus" size={24} type="entypo" />
        <Text>Thêm phòng</Text>
      </TouchableOpacity>
    );
  };

  renderLeftComponent = () => (
    <TouchableOpacity
      onPress={() => NavigationService.goBack()}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name="chevron-left" size={24} type="entypo" />
    </TouchableOpacity>
  );

  renderForeground = () => {
    const height = 120;
    const marginTop = parallaxHeaderHeight - height;
    const { detail: { data } } = this.props;

    return (
      <QuickView>
        <QuickView
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          height={height}
          backgroundColor="transparent"
        // backgroundColor={theme.colors.bgColor}
          marginTop={marginTop}
          paddingHorizontal={25}
          paddingTop={25}
        >
          <QuickView>
            <Text color={Color.white} type="title" bold numberOfLines={2}>
              {data?.title}
            </Text>
          </QuickView>
          <QuickView marginTop={0} row justifyContent="space-between">
            <QuickView row center>
              <Text
                marginTop={10}
                icon={{
                  name: 'wallet-outline',
                  type: 'ionicon',
                  size: 14,
                }}
                bold
                color={Color.white}
                fontSize={14}
              >
                {data?.averagePrice ? vndPriceFormat(data?.averagePrice * 10) : 'Đang cập nhật'}
              </Text>
            </QuickView>
            <QuickView row center>
              <Text
                marginTop={10}
                icon={{
                  name: 'calendar-outline',
                  type: 'ionicon',
                  size: 14,
                }}
                bold
                color={Color.white}
                fontSize={14}
              >
                {data?.updatedAt ? moment(data?.updatedAt).format('DD/MM/YYYY') : 'Đang cập nhật'}
              </Text>
            </QuickView>
            <QuickView
              backgroundColor={lightPrimaryColor}
              center
              paddingHorizontal={24}
              paddingVertical={5}
              borderRadius={15}
            >
              <Text color={Color.white} bold fontSize={12}>
                {data?.category?.name}
              </Text>
            </QuickView>
          </QuickView>
        </QuickView>

      </QuickView>
    );
  };

  renderCenterComponent = () => {
    const { detail: { data } } = this.props;
    return (
      <QuickView center>
        <Text type="title" bold numberOfLines={1} color={lightPrimaryColor}>
          {data?.category?.name}
        </Text>
      </QuickView>
    );
  };

  renderStickyHeader = () => {
    const { route: { params: { id, name } } } = this.props;
    return (
      <Header
        backgroundColor={lightPrimaryColor}
        leftComponent={<QuickView width={30} />}
          // title={data?.title}
        // placement="left"
        // centerComponent={this.renderCenterComponent()}
        // centerContainerStyle={{ borderWidth: 1 }}
      />
    );
  };

  renderRightAction = (text: string, style: any, textColor: string, x: number, progress: any, onPress:() => any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.swipe.close();
      onPress();
      // alert(text);
    };
    return (
      <Animated.View style={{
        flex: 1, transform: [{ translateX: trans }], justifyContent: 'flex-end',
      }}
      >
        <TouchableOpacity
          onPress={pressHandler}
          style={[{
            borderRadius: 10,
            alignItems: 'center',
            height: 100,
            justifyContent: 'center',
            ...style,
          }]}
        >
          <Text bold color={textColor}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  renderRightActions = (progress: any, id: number) => (
    <QuickView style={{ width: 180, flexDirection: 'row', borderRadius: 10 }}>
      {/* {this.renderRightAction('Chi tiết', '#E6E9F0', Color.black, 180, progress, () => NavigationService.navigate(
          rootStack.exploreStack,
          { screen: exploreStack.detailRoom, params: { id: 5 } },
        ))} */}
      {this.renderRightAction('Sửa', { borderWidth: 1, borderColor: '#DC2F2F' }, lightPrimaryColor, 180, progress, () => NavigationService.navigate(profileStack.editRoom, id))}
      {this.renderRightAction('Xóa', { backgroundColor: '#DC2F2F' }, Color.white, 120, progress, () => this.setState({ deleteOverlay: true, deleteRoomId: id }))}
    </QuickView>
  );

  handleDeleteRoom = () => {
    const { deleteRoomId } = this.state;
    if (deleteRoomId !== 0) {
      console.log('deleteRoomId', deleteRoomId);

      // try {
      //   const
      // } catch (error) {

      // }
    }
  };

  renderItem = ({ item }: {item: any}) => (
    <Swipeable
      ref={(ref: any) => {
        this.swipe = ref;
      }}
      renderRightActions={(progress: any) => this.renderRightActions(progress, item?.id)}
    >
      {/* <Text>"hello"</Text> */}
      <QuickView
        // flex={1}
        key={item?.id}
        row
        height={100}
        marginTop={30}
        backgroundColor={Color.white}
        borderRadius={10}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      >
        <QuickView width={100}>
          <Image
            width={100}
            height={100}
            sharp
            style={{
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
                        // onPress={() => NavigationService.navigate('PropertyStack', {
                        //   screen: 'PropertyDetailStack',
                        //   params: {
                        //     id: 1,
                        //   },
                        // })}
            source={{ uri: item?.images[0] }}
          />
        </QuickView>
        <QuickView borderRadius={10} justifyContent="space-between" flex={1}>
          <QuickView padding={10} flex={1} height={55}>
            <Text numberOfLines={2} fontSize={16} bold>
              {item?.name}
            </Text>
            {/* <Text fontSize={10} numberOfLines={1} marginTop={5}>
              {item?.address}
            </Text> */}
          </QuickView>
          <QuickView
            row
            backgroundColor="#E6E9F0"
            borderBottomRightRadius={10}
            height={45}
          >
            <QuickView flex={1} center>
              <Text fontSize={12}>Diện tích</Text>
              <Text color={lightPrimaryColor} fontSize={12} bold>
                {Math.floor(item?.area)}
                m2
              </Text>
            </QuickView>
            <QuickView flex={1} center>
              <Text fontSize={12}>Giá</Text>
              <Text color={lightPrimaryColor} fontSize={12} bold>
                {vndPriceFormat(item?.price * 10)}
              </Text>
            </QuickView>
            <QuickView flex={1} center>
              <Button
                onPress={() => this.swipe.openRight()}
              // onPress={() => NavigationService.navigate(
              //   exploreStack.detailRoom,
              //   { id: item?.id },
              // )}
                clear
                title="Xem thêm"
                // title="..."

                height={30}
                titleStyle={{
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
                titlePaddingVertical={0}
              />
            </QuickView>
          </QuickView>
        </QuickView>
      </QuickView>
    </Swipeable>

  );

  toggleOverlayDelete = () => {
    this.setState((prevState: any) => ({ deleteOverlay: !prevState.deleteOverlay }));
  };

  render() {
    const { detail: { data, loading }, roomsOfProperty } = this.props;
    // console.log('🚀 ~ file: ManageDetailProperty.tsx ~ line 363 ~ ManageDetailProperty ~ render ~ roomsOfProperty', roomsOfProperty);
    const { deleteOverlay } = this.state;
    return (
      <Container>
        <Overlay
          onBackdropPress={this.toggleOverlayDelete}
          isVisible={deleteOverlay}
          // isVisible
        // height={200}
          overlayStyle={{ borderRadius: 8, height: 180, width: '80%' }}
        >
          <QuickView>
            <Text center bold type="title" color={lightPrimaryColor} marginTop={20}>
              Thông báo
            </Text>
            <Text center fontSize={16} marginTop={12} marginHorizontal={20}>
              Bạn có chắc chắn muốn xóa phòng ?
            </Text>
            <QuickView
              row
              justifyContent="space-between"
              paddingHorizontal={20}
            // width={250}
            // marginHorizontal={50}
            // center
              marginTop={12}
            >
              <Button
                outline
                title="Hủy"
                width={110}
                onPress={this.toggleOverlayDelete}
              />
              <Button
                title="Xác nhận"
                titleColor="#FFFFFF"
                width={110}
                onPress={this.handleDeleteRoom}
              />
            </QuickView>
          </QuickView>
        </Overlay>
        <ParallaxScrollView
          renderFixedHeader={() => (
            <Header
              placement="left"
              leftComponent={this.renderLeftComponent()}
              rightComponent={this.renderRightComponent()}
              position="absolute"
              transparent
            />
          )}
          imageBackgroundColor="rgba(0, 0, 0, 0.2)"
          renderForeground={this.renderForeground}
          renderStickyHeader={this.renderStickyHeader}
          backgroundImageSource={{
            // uri: data?.thumbnail,
            uri: 'https://picsum.photos/1500/1500',
          }}
          headerBackgroundColor="#012066"
        >
          <Body fullHeight>
            {/* {
              loading ? (
                <QuickView flex={1} marginTop={40} center>
                  <ActivityIndicator size="large" />
                </QuickView>
              ) : ( */}
            <QuickView marginTop={20}>
              {/* <Text style={{ textAlign: 'justify' }}>{data?.content}</Text> */}
              <QuickView>
                <Text color={lightPrimaryColor} bold type="title">Địa chỉ</Text>
                <Text>{!loading ? `${data?.address}, ${data?.destination?.name}, ${data?.destination?.parent?.name}, ${data?.destination?.parent?.parent?.name}` : 'Đang cập nhật'}</Text>
              </QuickView>
              <QuickView marginTop={10}>
                <Text color={lightPrimaryColor} bold type="title">Mô tả</Text>
                <Text>{data?.description}</Text>
              </QuickView>
              {/* <QuickView row height={50} marginTop={10}>
                <QuickView flex={1}>
                  <Text color={lightPrimaryColor} bold type="title">{`Sở hữu bởi ${data?.owner?.fullName}`}</Text>
                  <Text>Tham gia ngày 08/06/2020</Text>
                </QuickView>
                <QuickView>
                  <Avatar
                    size="medium"
                    rounded
                    source={{ uri: data.owner?.avatar }}
                  />
                </QuickView>
              </QuickView> */}
              <QuickView marginTop={10}>
                <Text color={lightPrimaryColor} bold type="title">Danh sách phòng</Text>
                <FlatList style={{ padding: 5 }} data={roomsOfProperty?.data} renderItem={this.renderItem} />
              </QuickView>
              {/* <Swipeable renderRightActions={this.renderLeftActions}>
                <Text>"hello"</Text>
              </Swipeable> */}
              {/* <HTML
                classesStyles={{ content: { color: lightPrimaryColor } }}
                html={`<div class="content">${'data?.content'}</div>`}
              /> */}
            </QuickView>
            {/* )
            } */}
          </Body>
        </ParallaxScrollView>
        {loading ? <OverlayLoading /> : null}
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: parseObjectSelector(
    applyObjectSelector(propertyDetailSelector, state),
  ),
  roomsOfProperty: parseObjectSelector(applyArraySelector(roomsOfPropertySelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetailProperty: (id: number) => dispatch(propertyGetDetail({ id })),
  clear: () => dispatch(clearDetail()),
  getListRoom: (id: number, query?: TQuery) => dispatch(roomGetList({ id, query })),
  clearRoomList: () => dispatch(clearListRoom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageDetailProperty);
