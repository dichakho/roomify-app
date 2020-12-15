import React from 'react';
import { ThemeProvider, withTheme } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { compose } from 'recompose';
import { lightTheme, darkTheme } from '@themes/Theme';
import i18n from '@config/i18n';
import {
  languageSelector,
  themeSelector,
} from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/constant';
import { Global } from '@utils/appHelper';
import { applyArraySelector, applyObjectSelector, parseArraySelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { TObjectRedux } from '@utils/redux';
import { cityListSelector } from '@contents/Main/containers/Explore/redux/selector';
import messaging from '@react-native-firebase/messaging';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import FirebaseService from '@core/services/firebase';
import AppNavigator from './app.navigator';

interface Props {
  language: string;
  t: any;
  colors: any;
  themeRedux: any;
  loginSelectorData: TObjectRedux;
}

interface State {
  isInternetCheck: boolean;
  isConnected: boolean;
}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isInternetCheck: false,
      isConnected: true,
    };
    const { loginSelectorData } = this.props;
    Global.token = loginSelectorData.data.get('token');
    if (loginSelectorData?.data) {
      Global.roleApi = loginSelectorData.data.toJS()?.role?.map((r: any) => r.name);
    }
    // Global.roleApi = loginSelectorData.data.toJS().role.map((r: any) => r.name);
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      const { isInternetCheck } = this.state;
      const { isConnected } = state;
      if (!isConnected) {
        this.setState({
          isConnected: false,
        });
      }
      if (isInternetCheck && isConnected) {
        this.setState({
          isConnected: true,
          isInternetCheck: false,
        });
      }
    });

    this.requestUserPermission();
    this.messageListener();
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
      || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await FirebaseService.setToken();
      // const fcmToken = await messaging().getToken();
      // console.log('FCMtoken', fcmToken);

      // console.log('Authorization status:', authStatus);
    }
  };

  messageListener = async () => {
    // Foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification) {
        showMessage({
          message: remoteMessage.notification.title || '',
          description: remoteMessage.notification.body,
          backgroundColor: Color.grey,
          // icon: 'info',
          duration: 5000,
          hideStatusBar: true,
          textStyle: { color: lightPrimaryColor },
          titleStyle: { fontWeight: 'bold', fontSize: 16, color: lightPrimaryColor },
          // style: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10 },
          onPress: () => {
            // eslint-disable-next-line no-console
            console.log('Message Click');
          },
        });
      }
    });
    // Background & Quit
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
    return unsubscribe;
  };

  checkInternet = () => {
    this.setState({
      isInternetCheck: true,
    });
  };

  showNotConnectedMessage = () => {
    showMessage({
      message: 'No internet',
      type: 'danger',
      onPress: () => this.checkInternet(),
    });
  };

  render() {
    const { language, themeRedux } = this.props;
    const { isConnected } = this.state;

    /**
     * Change language
     */
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    /**
     * Theme
     */
    const themeColor: any = themeRedux === ThemeEnum.LIGHT ? lightTheme : darkTheme;

    /**
     * Check Internet
     */
    if (!isConnected) this.showNotConnectedMessage();

    return (
      <ThemeProvider theme={themeColor}>
        <AppNavigator />
        <FlashMessage position="top" />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
  themeRedux: themeSelector(state),
  loginSelectorData: applyObjectSelector(loginSelector, state),
  // city: parseArraySelector(applyArraySelector(cityListSelector, state)),
});

export default compose(
  withTheme,
  withTranslation(),
  connect(mapStateToProps, null),
)(AppContainer as any);
