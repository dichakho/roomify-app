import React, { PureComponent } from 'react';
import {
  QuickView, Container, Avatar, Text, Body,
} from '@components';
import { Icon } from 'react-native-elements';
import { Color } from '@themes/Theme';
import { StatusBar } from 'react-native';
import AuthTopTab from '../index.toptab';
import LoginBackIcon from '../Login/Shared/LoginBackIcon';

class MainScreen extends PureComponent {
  render() {
    return (

      <Container backgroundColor={Color.white} dismissKeyboard>

        <Body fullWidth>
          {/* <QuickView flex={1} marginLeft={20} alignItems="center" width="80%" row> */}
          {/* <LoginBackIcon /> */}
          {/* <Icon
              name="chevron-left"
              type="entypo"
              color={Color.black}
              size={30}
            /> */}
          <AuthTopTab />
          {/* </QuickView> */}
        </Body>
      </Container>
    );
  }
}

export default MainScreen;
