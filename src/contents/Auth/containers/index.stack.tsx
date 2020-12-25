import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import authStack from './routes';
import LoginScreen from './Login';
import MainScreen from './Shared';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name={authStack.mainScreen} component={MainScreen} />
      {/* <Stack.Screen name={authStack.loginScreen} component={LoginScreen} /> */}
    </Stack.Navigator>
  );
}
