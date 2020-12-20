import React, { Component } from 'react';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import {
  Dimensions,
  StyleSheet,
  View,
  Platform,
  // ScrollView,
  Animated,
} from 'react-native';
import {
  QuickView,
  Text,
  Container,
  Header,
  Body,
  Button,
  // Body,
  // Image,
  // Button,
  // Carousel,
} from '@components';
import { connect } from 'react-redux';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { convertPrice, vndPriceFormat } from '@utils/functions';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon, Overlay } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import OverlayLoading from '@components/OverlayLoading';
import NavigationService from '@utils/navigation';
import _, { result } from 'lodash';
import { post } from '@utils/api';
import { bookingRoom, roomGetDetail } from '../redux/slice';
import { bookingRoomSelector, detailRoomSelector } from '../redux/selector';
import exploreStack from '../routes';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
interface Props {
  route?: any;
  getDetail: (id: number) => any;
  detail: TObjectRedux;
  booking: (id: number) => any;
  bookingSelector: TObjectRedux;
}
interface State {
  scrollY: any;
  activeSlide: number;
  overlayIsVisible: boolean;
}
class DetailRoom extends Component<Props, State> {
  // data = [
  //   {
  //     title: 'Beautiful and dramatic Antelope Canyon',
  //     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
  //     illustration: 'https://picsum.photos/1500/1500',
  //   },
  //   {
  //     title: 'Earlier this morning, NYC',
  //     subtitle: 'Lorem ipsum dolor sit amet',
  //     illustration: 'https://picsum.photos/1500/1500',
  //   },
  //   {
  //     title: 'White Pocket Sunset',
  //     subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
  //     illustration: 'https://picsum.photos/1500/1500',
  //   },
  //   {
  //     title: 'Acrocorinth, Greece',
  //     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
  //     illustration: 'https://picsum.photos/1500/1500',
  //   },
  //   {
  //     title: 'The lone tree, majestic landscape of New Zealand',
  //     subtitle: 'Lorem ipsum dolor sit amet',
  //     illustration: 'https://picsum.photos/1500/1500',
  //   },
  //   {
  //     title: 'Middle Earth, Germany',
  //     subtitle: 'Lorem ipsum dolor sit amet',
  //     illustration: 'https://picsum.photos/1500/1500',
  //   },
  // ];

  CAROUSEL_HEIGHT = screenWidth - 60;

  myRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      activeSlide: 0,
      overlayIsVisible: false,
    };
  }

  componentDidMount() {
    const { getDetail, route: { params: { id } } } = this.props;
    getDetail(id);
  }

  handleBooking = async () => {
    console.log('123');
    const { route: { params: { id } }, booking } = this.props;
    const results = await post('/booking', {
      roomId: id,
    });
    if (results) {
      this.setState({ overlayIsVisible: true });
    }
    // booking(id);
  };

  renderItem = ({ item }: { item: any }, parallaxProps: any) => (
    <QuickView>
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />

        {/* <Text numberOfLines={2}>{item.title}</Text> */}
      </View>
    </QuickView>
  );

  renderPagination = () => {
    const { activeSlide } = this.state;
    const { detail: { data, loading } } = this.props;
    if (loading) {
      return null;
    }
    return (
      <Pagination
        dotsLength={data?.images?.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: 'absolute', width: '100%', top: screenWidth - 120,
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotStyle={{

          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  ;

  render() {
    const { scrollY, overlayIsVisible } = this.state;
    const { route: { params: { id } }, detail: { data, loading }, bookingSelector } = this.props;
    console.log('bookingSelector', bookingSelector);

    if (loading || _.isEmpty(data)) {
      return <OverlayLoading backgroundColor={Color.white} />;
    }
    return (
      <Container>
        <Header title="Chi tiết phòng" backIcon />
        <Overlay isVisible={overlayIsVisible} overlayStyle={{ borderRadius: 8, width: '80%' }}>
          <QuickView>
            <Text center color={lightPrimaryColor} type="title" bold>Thông báo</Text>
            <Text marginVertical={10} center>
              Chủ nhà sẽ liên hệ với bạn trong thời gian sớm nhất
            </Text>
            <QuickView paddingHorizontal={80}>
              <Button
                title="Đóng"
                onPress={() => {
                  this.setState({ overlayIsVisible: false });
                  // NavigationService.goBack();
                }}
              />
            </QuickView>
          </QuickView>
        </Overlay>
        <Animated.ScrollView
          // onScroll={(e) => {
          //   console.log(e.nativeEvent.contentOffset.y);
          // }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [
                      -this.CAROUSEL_HEIGHT,
                      0,
                      this.CAROUSEL_HEIGHT,
                      this.CAROUSEL_HEIGHT + 1,
                    ],
                    outputRange: [
                      -this.CAROUSEL_HEIGHT / 2,
                      0,
                      this.CAROUSEL_HEIGHT * 0.75,
                      this.CAROUSEL_HEIGHT * 0.75,
                    ],
                  }),
                },
                {
                  scale: scrollY.interpolate({
                    inputRange: [
                      -this.CAROUSEL_HEIGHT,
                      0,
                      this.CAROUSEL_HEIGHT,
                      this.CAROUSEL_HEIGHT + 1,
                    ],
                    outputRange: [2, 1, 0.5, 0.5],
                  }),
                },
              ],
            }}
          >
            <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 60}
              data={data?.images}
              renderItem={(item: any, props: any) => this.renderItem(item, props)}
              hasParallaxImages
              onSnapToItem={(index) => this.setState({ activeSlide: index })}
              // onSnapToItem
            />
            {this.renderPagination()}

          </Animated.View>
          <Body>
            <Text marginTop={20} type="title">
              {data?.name}
            </Text>
            <QuickView marginTop={10} row center>
              <Text type="title">GIÁ PHÒNG: </Text>
              <Text color={lightPrimaryColor} type="title">
                {vndPriceFormat(data?.price * 10)}
                {' '}
                VND
              </Text>
            </QuickView>
            <QuickView paddingVertical={20} style={{ borderBottomWidth: 1, borderColor: '#B1ADAD' }} row>
              <QuickView center flex={1}>
                <Text>Trạng thái</Text>
                <Text color={lightPrimaryColor}>{data?.status}</Text>
              </QuickView>
              <QuickView center flex={1}>
                <Text>Diện tích</Text>
                <Text color={lightPrimaryColor}>
                  {Math.floor(data?.area)}
                  {' '}
                  m2
                </Text>
              </QuickView>
            </QuickView>
            <QuickView paddingVertical={20}>
              <Text bold type="paragraph">Tiện ích</Text>
              <QuickView paddingVertical={10} style={{ flexWrap: 'wrap' }} row>
                {data?.amenities.map((a: any) => (
                  <QuickView key={a?.id} marginVertical={5} width="45%" alignItems="center" padding={5} row>
                    <Icon name={a?.iconName} type={a?.iconType} />
                    <Text marginLeft={5}>{a?.name}</Text>
                  </QuickView>
                ))}
              </QuickView>
            </QuickView>

            <QuickView
              style={{
                // ...StyleSheet.absoluteFillObject,
                height: 300,
                // width: 400,
                justifyContent: 'flex-end',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <MapView
                style={{ ...StyleSheet.absoluteFillObject, borderRadius: 10 }}
                region={{
                  latitude: 16.06375,
                  longitude: 108.17969,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              >
                <Marker
              // style={{ borderWidth: 1 }}
              // key={marker.name}
              // ref={(ref) => { markers[index] = ref; }}
                  // onPress={() => this.onMarkerPressed(marker, index)}
                  coordinate={{
                    latitude: 16.06375,
                    longitude: 108.17969,
                  }}
                >
                  <QuickView center backgroundColor="'rgba(220,47,48,0.2)'" width={100} height={100} borderRadius={50}>
                    <QuickView center backgroundColor="'rgba(220,47,48,0.8)'" width={50} height={50} borderRadius={25}>
                      <Icon color={Color.white} name="home" type="antdesign" />
                    </QuickView>
                  </QuickView>
                </Marker>
              </MapView>
              <QuickView
                activeOpacity={1}
                onPress={() => NavigationService.navigate(exploreStack.mapDetailRoom)}
                style={{
                  flex: 1,
                  ...StyleSheet.absoluteFillObject,
                  borderRadius: 10,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}
              />

              {/* <Button marginVertical={10} title="Xem bản đồ" onPress={() => NavigationService.navigate(exploreStack.mapDetailRoom)} /> */}
            </QuickView>
            {/* <Button marginVertical={10} title="Xem bản đồ" onPress={() => NavigationService.navigate(exploreStack.mapDetailRoom)} /> */}

          </Body>

        </Animated.ScrollView>
        <QuickView
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
            paddingBottom: 20,
            paddingTop: 10,
          }}
          backgroundColor="#FFFFFF"
          justifyContent="space-around"
          alignItems="center"
          row
        >
          {/* <Button width={100} marginTop={20} titleStyle={{ fontWeight: 'bold' }} title="Save" onPress={this.handleBooking} /> */}
          <QuickView center row>
            <Text type="title" bold>
              {convertPrice(data?.price * 10, '.')}
              ₫
            </Text>
            <Text type="title">/ 1 tháng</Text>
          </QuickView>
          <Button width={100} titleStyle={{ fontWeight: 'bold' }} title="Booking" onPress={this.handleBooking} />
        </QuickView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: parseObjectSelector(applyObjectSelector(detailRoomSelector, state)),
  bookingSelector: parseObjectSelector(applyObjectSelector(bookingRoomSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetail: (id: number) => dispatch(roomGetDetail({ id })),
  booking: (id: number) => dispatch(bookingRoom({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom);
