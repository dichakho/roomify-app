/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, Button, Image,
} from '@components';
import MapView, { Callout, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, StyleSheet } from 'react-native';
import { Color } from '@themes/Theme';
import { convertPrice, vndPriceFormat } from '@utils/functions';
import NavigationService from '@utils/navigation';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { TArrayRedux, TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import rootStack from '@contents/routes';
import { setIdIntoParams } from '@utils/appHelper';
import { propertyGetList } from '../redux/slice';
import { propertyListSelector } from '../redux/selector';
import exploreStack from '../routes';

const LATITUDE = 16.0544068;
const LONGITUDE = 108.2021667;
// const coordinates = [
//   {
//     name: 'Nearby the beach & Nguyen Tat Thanh street studio',
//     latitude: LATITUDE,
//     longitude: LONGITUDE,
//     image: 'https://a0.muscache.com/im/pictures/810804f6-7f63-40b9-a9c0-d7468d7de64d.jpg?im_w=720',
//     price: 550000,
//   },
//   {
//     name: '★1BR COSY HOUSE★500m to airport★',
//     latitude: LATITUDE + 0.004,
//     longitude: LONGITUDE - 0.003,
//     image: 'https://a0.muscache.com/im/pictures/0b282e91-3784-4577-8bd8-23c4e50a6304.jpg?im_w=720',
//     price: 750000,
//   },
//   {
//     name: 'BIG PROMO ❤️ Lil house - Apartment 1',
//     latitude: LATITUDE + 0.002,
//     longitude: LONGITUDE - 0.006,
//     image: 'https://a0.muscache.com/im/pictures/9a6a5e47-9129-4d7a-9b67-b6645c4ef67c.jpg?im_w=720',
//     price: 850000,
//   },
//   {
//     name: 'Love, Cozy, Quiet#Central City# 5min Dragon Bridge',
//     latitude: LATITUDE - 0.004,
//     longitude: LONGITUDE - 0.004,
//     image: 'https://a0.muscache.com/im/pictures/12e38142-adf0-49c6-90f9-822aca4f20cb.jpg?im_w=720',
//     price: 1550000,
//   },
//   {
//     name: '5Min to Cathedral STUDIO w/ city view',
//     latitude: LATITUDE - 0.008,
//     longitude: LONGITUDE - 0.004,
//     image: 'https://a0.muscache.com/im/pictures/b8176838-3107-4ffc-9e3d-9eec09448959.jpg?im_w=720',
//     price: 950000,
//   },
// ];
interface Props {
  route?: any;
  getList: (query ?: TQuery) => any;
  properties: TArrayRedux;
}
interface State {
  markers: any;
  propertyIndex: number;
}
class MapScreen extends PureComponent<Props, State> {
  fields = 'id,thumbnail,averagePrice,averageArea,title,longitude,latitude,address';

  carousel: any;

  map: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      markers: [],
      propertyIndex: 0,
    };
  }

  componentDidMount() {
    const { getList, route: { params: { s } } } = this.props;
    getList(
      { fields: this.fields, s },
    );
  }

  renderCarouselItem = ({ item }: { item: any}) => (
    <QuickView
      key={item?.id}
      row
      marginTop={30}
      backgroundColor="#FFFFFF"
      borderRadius={10}
      style={{
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 3,
          height: 7,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 2.5,
      }}
    >
      <QuickView width={102}>
        <Image
          width={102}
          height={102}
          sharp
          style={{
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          source={{ uri: item?.thumbnail }}
        />
      </QuickView>
      <QuickView flex={7} height={102}>
        <QuickView marginHorizontal={20} marginTop={10}>
          <Text numberOfLines={1} fontSize={16} bold>
            {item?.title}
          </Text>
          <Text fontSize={10} numberOfLines={1} marginTop={5}>
            {item?.address}
          </Text>
        </QuickView>
        <QuickView
          row
          backgroundColor="#E6E9F0"
          borderBottomRightRadius={10}
          borderTopRightRadius={10}
          marginLeft={0}
          marginTop={10}
          height={46}
        >
          <QuickView flex={1} center>
            <Text fontSize={12}>Diện tích</Text>
            <Text color={lightPrimaryColor} fontSize={12} bold>
              {Math.floor(item?.averageArea)}
              m2
            </Text>
          </QuickView>
          <QuickView flex={1} center>
            <Text fontSize={12}>Giá</Text>
            <Text color={lightPrimaryColor} fontSize={12} bold>
              {vndPriceFormat(item?.averagePrice * 10)}
            </Text>
          </QuickView>
          <QuickView flex={1} center>
            <Button
              onPress={() => NavigationService.navigate(rootStack.exploreStack, {
                screen: exploreStack.detailProperty,
                params: setIdIntoParams(item),
              })}
              clear
              title="Xem thêm"
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
  );

  onCarouselItemChange = (index: number) => {
    const { markers } = this.state;
    const { route, properties: { data } } = this.props;
    this.setState({ propertyIndex: index });
    const location = data[index];

    this.map.animateToRegion({
      latitude: location?.latitude,
      longitude: location?.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0035,
      // latitudeDelta: 1,
      // longitudeDelta: 1,
    });

    markers[index].showCallout();
  };

  onMarkerPressed = (location: any, index: number) => {
    this.map.animateToRegion({
      latitude: location?.latitude,
      longitude: location?.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.0035,
      // latitudeDelta: 1,
      // longitudeDelta: 1,
    });
    this.carousel.snapToItem(index);
  };

  render() {
    const { markers, propertyIndex } = this.state;
    const { route, properties } = this.props;
    console.log('properties', properties?.data);

    return (

      <QuickView style={{ ...StyleSheet.absoluteFillObject }}>
        <Header title="Bản đồ" backIcon />
        <MapView
          ref={(map) => { this.map = map; }}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: properties?.data[0]?.latitude || LATITUDE,
            longitude: properties?.data[0]?.longitude || LONGITUDE,
            // latitude: LATITUDE,
            // longitude: LONGITUDE,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            // latitudeDelta: 1,
            // longitudeDelta: 1,
          }}
        >
          {properties?.data.map((marker: any, index: number) => {
            console.log('marker');

            return (
              <Marker
                // style={{ borderWidth: 1 }}
                key={marker?.title}
                ref={(ref) => { markers[index] = ref; }}
                onPress={() => this.onMarkerPressed(marker, index)}
                coordinate={{
                  latitude: marker?.latitude,
                  longitude: marker?.longitude,
                }}
              >
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
                  }}
                  padding={7}
                  borderRadius={20}
                  backgroundColor={propertyIndex === index ? lightPrimaryColor : Color.white}
                >
                  <Text bold color={propertyIndex === index ? Color.white : lightPrimaryColor}>{`${convertPrice(marker?.averagePrice * 10, ',')} ₫`}</Text>
                </QuickView>
                {/* <Callout>
                  <Text>{marker.price}</Text>
                </Callout> */}
              </Marker>
            );
          })}
        </MapView>
        <Carousel
          ref={(c) => {
            this.carousel = c;
          }}
          data={properties?.data}
          containerCustomStyle={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 48,
          }}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 40}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        />
      </QuickView>

    );
  }
}

const mapStateToProps = (state: any) => ({
  properties: parseArraySelector(applyArraySelector(propertyListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query ?: TQuery) => dispatch(propertyGetList({ query })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
