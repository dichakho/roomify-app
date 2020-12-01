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
import { Color } from '@themes/Theme';
import { connect } from 'react-redux';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { TObjectRedux } from '@utils/redux';
import { vndPriceFormat } from '@utils/functions';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import OverlayLoading from '@components/OverlayLoading';
import NavigationService from '@utils/navigation';
import _ from 'lodash';
import { roomGetDetail } from '../redux/slice';
import { detailRoomSelector } from '../redux/selector';
import exploreStack from '../routes';

const { width: screenWidth } = Dimensions.get('window');
interface Props {
  route?: any;
  getDetail: (id: number) => any;
  detail: TObjectRedux;
}
interface State {
  scrollY: any;
  activeSlide: number;
}
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
class DetailRoom extends Component<Props, State> {
  data = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://picsum.photos/1500/1500',
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://picsum.photos/1500/1500',
    },
    {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://picsum.photos/1500/1500',
    },
    {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://picsum.photos/1500/1500',
    },
    {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://picsum.photos/1500/1500',
    },
    {
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://picsum.photos/1500/1500',
    },
  ];

  CAROUSEL_HEIGHT = screenWidth - 60;

  myRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      activeSlide: 0,
    };
  }

  componentDidMount() {
    const { getDetail, route: { params: { id } } } = this.props;
    getDetail(id);
  }

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
    const { scrollY } = this.state;
    const { route: { params: { id } }, detail: { data, loading } } = this.props;
    if (loading || _.isEmpty(data)) {
      return <OverlayLoading backgroundColor={Color.white} />;
    }
    return (
      <Container>
        <Header title="Chi tiết phòng" backIcon />
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
                {vndPriceFormat(data?.price * 100000)}
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
                  <Icon name="home" type="antdesign" />
                </Marker>
              </MapView>
            </QuickView>
            <Button marginVertical={10} title="Xem bản đồ" onPress={() => NavigationService.navigate(exploreStack.mapDetailRoom)} />
          </Body>
        </Animated.ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: parseObjectSelector(applyObjectSelector(detailRoomSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetail: (id: number) => dispatch(roomGetDetail({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailRoom);
