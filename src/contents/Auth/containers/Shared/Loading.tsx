/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import {
  QuickView, Text, Body, Image,
} from '@components';
import { Metrics } from '@themes';
import { parallaxHeaderHeight, stickyHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { ActivityIndicator } from 'react-native';
import { Color } from '@themes/Theme';

class LoadingScreen extends PureComponent {
  render() {
    return (
      <Body backgroundColor={Color.grey} style={{ minHeight: Metrics.screenHeight - parallaxHeaderHeight + stickyHeaderHeight }}>
        <ActivityIndicator style={{ marginTop: 200 }} />
        {/* <QuickView marginTop={50}>
          <Image source={require('@assets/images/listEmptyNews.png')} width={300} />
          <ActivityIndicator style={{ marginTop: 20 }} />
        </QuickView> */}
      </Body>
    );
  }
}
export default LoadingScreen;
