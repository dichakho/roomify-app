/* eslint-disable no-console */
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

class FirebaseService {
  static async getToken() {
    const fcmToken = await firebase.messaging().getToken();
    console.log('fcmToken', fcmToken);
    if (fcmToken) {
      return fcmToken;
    }
    return '';
  }

  static async setToken() {
    const fcmToken = await firebase.messaging().getToken();
    console.log('fcmToken', fcmToken);
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }

  static async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
      || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      await this.setToken();
    }
  }
}
export default FirebaseService;
