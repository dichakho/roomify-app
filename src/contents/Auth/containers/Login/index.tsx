import React, { PureComponent } from 'react';
import {
  QuickView, Container, Avatar, Text,
} from '@components';
import { Color } from '@themes/Theme';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import LoginForm from './Shared/LoginForm';
import LoginBackIcon from './Shared/LoginBackIcon';

class LoginScreen extends PureComponent {
  render() {
    return (
      <Container dismissKeyboard>
        <QuickView
          flex={1}
          paddingHorizontal={20}
          backgroundColor={Color.grey}
        >
          <LoginBackIcon />
          <QuickView marginBottom={50} marginTop={150} center>
            <Text bold color={lightPrimaryColor} fontSize={30}>Welcome, Roomifier</Text>
          </QuickView>
          <LoginForm />
        </QuickView>
      </Container>
    );
  }
}

export default LoginScreen;
