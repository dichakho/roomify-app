/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import {
  QuickView, Text, Body, Image, Container, AuthButton,
} from '@components';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationService from '@utils/navigation';
import { post } from '@utils/api';
import _ from 'lodash';
import LoginBackIcon from '../Login/Shared/LoginBackIcon';
import LoginForm from '../Login/Shared/LoginForm';
import AuthInput from '../Shared/AuthInput';

interface Props {}
interface State {
  loading: boolean;
  notif: string | null;
}
class RegisterScreen extends PureComponent<Props, State> {
  username: any;

  fullName: any;

  phone: any;

  password: any;

  constructor(props:Props) {
    super(props);
    this.state = {
      loading: false,
      notif: null,
    };
  }

  handleOnRegister = async () => {
    this.setState({ loading: true });
    const username = this.username.getText();
    const password = this.password.getText();
    const fullName = this.fullName.getText();
    const phone = this.phone.getText();
    const payload = {
      username,
      fullName,
      phone,
      password,
    };
    console.log('paylaod', payload);
    // return 1;
    // await post('/auth/register', payload);
    try {
      await post('/auth/register', payload);
      this.setState({ notif: 'Đăng kí thành công' });
      // NavigationService.navigate
    } catch (error) {
      console.log('error', error);
    }
    this.setState({ loading: false });
  };

  render() {
    const { loading, notif } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Container scroll>
          <QuickView
            flex={1}
            paddingHorizontal={20}
            backgroundColor={Color.grey}
          >
            <Icon
              name="chevron-left"
              type="entypo"
              color={Color.black}
              size={30}
              onPress={() => NavigationService.goBack()}
              containerStyle={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 10,
              }}
            />
            <QuickView center>
              {/* <Text bold color={lightPrimaryColor} fontSize={30}>Hello, Roomifier</Text>
              <Text style={{ textAlign: 'center' }} bold marginTop={10} color={lightPrimaryColor}>
                Enter your information below
                and become Roomify's member
              </Text> */}
              <Image width={200} height={200} source={require('@assets/images/roomifyImg.png')} />
            </QuickView>
            <AuthInput
              ref={(ref: any) => {
                this.username = ref;
              }}
              placeholder="Username"
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <AuthInput
              ref={(ref: any) => {
                this.fullName = ref;
              }}
              placeholder="FullName"
              onSubmitEditing={() => Keyboard.dismiss()}
              marginVertical={10}
            />
            <AuthInput
              ref={(ref: any) => {
                this.password = ref;
              }}
              textContentType="oneTimeCode"
              placeholder="Password"
              validationField="password"
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
              secureTextEntry
              marginVertical={10}
            />
            <AuthInput
              ref={(ref: any) => {
                this.phone = ref;
              }}

              placeholder="Phone"
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
              marginVertical={10}
            />
            {!_.isNull(notif) ? <Text center marginVertical={10} success>{notif}</Text> : null}
            {/* <LoginForm /> */}
            <AuthButton
              title="Đăng ký"
              onPress={this.handleOnRegister}
            // color={Color.white}
            // outline
              loading={loading}

            />
          </QuickView>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}
export default RegisterScreen;
