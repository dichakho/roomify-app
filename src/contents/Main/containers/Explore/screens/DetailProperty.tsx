// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
// import {
//   QuickView,
//   Text,
//   Container,
//   Header,
//   Body,
//   Image,
//   Button,
//   // Carousel,
// } from '@components';
// import { Dimensions } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import _ from 'lodash';
// import { Icon } from 'react-native-elements';
// import LoginBackIcon from '@contents/Auth/containers/Login/Shared/LoginBackIcon';
// import { lightPrimaryColor, Color } from '@themes/ThemeComponent/Common/Color';
// import { lightComponentColor } from '@themes/ThemeComponent/Common/CommonProps';
// import WishlistIcon from '../Container/WishListIcon';

// const { width } = Dimensions.get('window');
// const data = [
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
// class DetailProperty extends PureComponent {
//   renderItem = ({ item, index }: { item: any; index: number }) => {
//     console.log(
//       '!!!',
//       data.map((d) => d.illustration),
//     );
//     const multipleSources: Array<any> = [];
//     _.map(data, 'illustration').map((link) => {
//       multipleSources.push({ uri: link });
//     });

//     return (
//       <Image
//         multipleSources={multipleSources}
//         viewEnable
//         sharp
//         width={width}
//         source={{ uri: item?.illustration }}
//       />
//     );
//   };

//   render() {
//     return (
//       <Container>
//         <LoginBackIcon />
//         <Body scroll fullView>
//           {/* <QuickView alignItems="flex-start" style={{ borderWidth: 1 }}>
//             <Icon name="search" type="ionicons" color="#000000" size={24} />
//           </QuickView> */}
//           <QuickView>
//             <Carousel
//               // ref={(c) => { this._carousel = c; }}
//               data={data}
//               renderItem={this.renderItem}
//               sliderWidth={width}
//               itemWidth={width}
//             />
//           </QuickView>
//           <QuickView row padding={20}>
//             {/* info */}
//             <QuickView flex={9}>
//               <Text color={lightPrimaryColor} bold>
//                 $4,999
//               </Text>
//               <QuickView row marginTop={10}>
//                 <Text
//                   icon={{
//                     name: 'circle',
//                     size: 5,
//                     color: Color.grey5,
//                     style: { marginTop: 8, marginHorizontal: 3 },
//                   }}
//                   iconRight>
//                   1,200 sq.ft
//                 </Text>
//                 <Text
//                   icon={{
//                     name: 'circle',
//                     size: 5,
//                     color: Color.grey5,
//                     style: { marginTop: 8, marginHorizontal: 3 },
//                   }}
//                   iconRight>
//                   4 Beds
//                 </Text>
//                 <Text>2 Bath</Text>
//               </QuickView>
//             </QuickView>
//             {/* WishlistIcon */}
//             <QuickView marginTop={15} alignItems="center" flex={1}>
//               <WishlistIcon active={false} id={1} />
//             </QuickView>
//           </QuickView>
//           <QuickView margin={20} height={1} backgroundColor="#B1ADAD" />
//           <QuickView paddingHorizontal={20}>
//             <Text>
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//               Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
//             </Text>
//           </QuickView>
//         </Body>
//         <QuickView
//           marginBottom={20}
//           paddingHorizontal={40}
//           row
//           justifyContent="space-between">
//           <Button
//             containerStyle={{
//               borderWidth: 1,
//               borderRadius: 10,
//               borderColor: 'rgba(177, 173, 173, 0.2)',
//             }}
//             backgroundColor={Color.grey2}
//             title="Ask a Question"
//             titleColor={lightComponentColor.textColor}
//           />
//           <Button title="Express Interest" />
//         </QuickView>
//       </Container>
//     );
//   }
// }

// const mapStateToProps = (state: any) => ({});

// const mapDispatchToProps = (dispatch: any) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(DetailProperty);

// import React, { PureComponent } from 'react';
// import { QuickView, Text, Container, Header, Body } from '@components';

// export default class DetailProperty extends PureComponent {
//   render() {
//     return (
//       <Container>
//         <Header backIcon title="ExampleScreen" />
//         <Body>
//           <QuickView>
//             <Text center>Example Screen</Text>
//           </QuickView>
//         </Body>
//       </Container>
//     );
//   }
// }

// import React, { Component } from 'react';
// import { Text, View, Dimensions, StyleSheet } from 'react-native';

// import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

// // import { scrollInterpolator, animatedStyles } from './utils/animations';

// const SLIDER_WIDTH = Dimensions.get('window').width;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

// const DATA = [];
// for (let i = 0; i < 10; i++) {
//   DATA.push(i);
// }

// export default class App extends Component {
//   state = {
//     index: 0,
//   };

//   constructor(props) {
//     super(props);
//     this._renderItem = this._renderItem.bind(this);
//   }

//   _renderItem({ item }) {
//     return (
//       <View style={styles.itemContainer}>
//         <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View>
//         <Carousel
//           ref={(c) => (this.carousel = c)}
//           data={DATA}
//           renderItem={this._renderItem}
//           sliderWidth={SLIDER_WIDTH}
//           itemWidth={ITEM_WIDTH}
//           containerCustomStyle={styles.carouselContainer}
//           inactiveSlideShift={0}
//           onSnapToItem={(index) => this.setState({ index })}
//           // scrollInterpolator={scrollInterpolator}
//           // slideInterpolatedStyle={animatedStyles}
//           useScrollView
//         />
//         <Text style={styles.counter}>{this.state.index}</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   carouselContainer: {
//     marginTop: 50,
//     borderWidth: 1,
//   },
//   itemContainer: {
//     width: ITEM_WIDTH / 2,
//     height: ITEM_HEIGHT,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'dodgerblue',
//     borderWidth: 1,
//     // alignSelf: 'flex-start',
//   },
//   itemLabel: {
//     color: 'white',
//     fontSize: 24,
//   },
//   counter: {
//     marginTop: 25,
//     fontSize: 30,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

import React, { Component } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
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
  // Body,
  // Image,
  // Button,
  // Carousel,
} from '@components';
import { Color } from '@themes/Theme';

const { width: screenWidth } = Dimensions.get('window');
interface Props {}
interface State {
  scrollY: any;
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
export default class MyCarousel extends Component<Props, State> {
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
    };
  }

  renderItem = ({ item }: { item: any }, parallaxProps: any) => (
    <View style={styles.item}>
      <ParallaxImage
        source={{ uri: item.illustration }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      {/* <Text numberOfLines={2}>{item.title}</Text> */}
    </View>
  );

  render() {
    const { scrollY } = this.state;
    return (
      <Container>
        <Header title="List room" backIcon />
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
              data={this.data}
              renderItem={(item: any, props: any) => this.renderItem(item, props)}
              hasParallaxImages
            />
          </Animated.View>
          <QuickView backgroundColor={Color.grey}>
            <Text>
              // Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem // Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorems / Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem // Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor
              sit amet Lorem Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit
              amet Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet
              Lorem Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
              Lorem ipsum dolor sit amet Lorem Lorem ipsum dolor sit amet Lorem
            </Text>
          </QuickView>
        </Animated.ScrollView>
      </Container>
    );
  }
}

// import React, { useRef, useState, useEffect } from 'react';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';

// const ENTRIES1 = [
//   {
//     title: 'Beautiful and dramatic Antelope Canyon',
//     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//     illustration: 'https://i.imgur.com/UYiroysl.jpg',
//   },
//   {
//     title: 'Earlier this morning, NYC',
//     subtitle: 'Lorem ipsum dolor sit amet',
//     illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
//   },
//   {
//     title: 'White Pocket Sunset',
//     subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
//     illustration: 'https://i.imgur.com/MABUbpDl.jpg',
//   },
//   {
//     title: 'Acrocorinth, Greece',
//     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//     illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
//   },
//   {
//     title: 'The lone tree, majestic landscape of New Zealand',
//     subtitle: 'Lorem ipsum dolor sit amet',
//     illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
//   },
// ];
// const { width: screenWidth } = Dimensions.get('window');

// const MyCarousel = (props) => {
//   const [entries, setEntries] = useState([]);
//   const carouselRef = useRef(null);

//   const goForward = () => {
//     carouselRef.current.snapToNext();
//   };

//   useEffect(() => {
//     setEntries(ENTRIES1);
//   }, []);

//   const renderItem = ({ item }: { item: any }, parallaxProps: any) => {
//     console.log('heello', parallaxProps);

//     return (
//       <View style={styles.item}>
//         <ParallaxImage
//           source={{ uri: item.illustration }}
//           containerStyle={styles.imageContainer}
//           style={styles.image}
//           parallaxFactor={0.4}
//           {...parallaxProps}
//         />
//         <Text numberOfLines={2}>{item.title}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={goForward}>
//         <Text>go to next slide</Text>
//       </TouchableOpacity>
//       <Carousel
//         ref={carouselRef}
//         sliderWidth={screenWidth}
//         sliderHeight={screenWidth}
//         itemWidth={screenWidth - 60}
//         data={entries}
//         renderItem={renderItem}
//         hasParallaxImages
//       />
//     </View>
//   );
// };

// export default MyCarousel;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//   },
//   item: {
//     width: screenWidth - 60,
//     height: screenWidth - 60,
//   },
//   imageContainer: {
//     flex: 1,
//     marginBottom: Platform.select({ ios: 0, android: 1 }),
// Prevent a random Android rendering issue
//     backgroundColor: 'white',
//     borderRadius: 8,
//   },
//   image: {
//     ...StyleSheet.absoluteFillObject,
//     resizeMode: 'cover',
//   },
// });
