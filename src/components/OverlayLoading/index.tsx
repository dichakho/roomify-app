import React, { PureComponent } from 'react';
import { QuickView } from '@components';
import { ActivityIndicator, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
interface Props {
  opacity?: number;
  backgroundColor?: string;
}
export default class OverlayLoading extends PureComponent<Props> {
  static defaultProps = {
    opacity: 0.7,
    backgroundColor: 'black',
  };

  render() {
    const { opacity: opacityProps, backgroundColor: backgroundColorProps } = this.props;
    return (
      <QuickView
        style={{
          flex: 1,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: opacityProps,
          backgroundColor: backgroundColorProps,
          // backgroundColor: 'rgba(255,255,255,0.2)',
          width,
          height,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </QuickView>
    );
  }
}
