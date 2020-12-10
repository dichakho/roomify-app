import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import profileStack from './routes';
import MoreScreen from './screens';
import RegisterOwner from './screens/RegisterOwner';
import Setting from './screens/Setting';
import MyAccount from './screens/MyAccount';
import MyProperty from './screens/MyProperty';
import CreateRoom from './screens/CreateRoom';

const Stack = createStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={profileStack.index} component={MoreScreen} />
      <Stack.Screen name={profileStack.registerOwner} component={RegisterOwner} />
      <Stack.Screen name={profileStack.setting} component={Setting} />
      <Stack.Screen name={profileStack.account} component={MyAccount} />
      <Stack.Screen name={profileStack.myProperty} component={MyProperty} />
      <Stack.Screen name={profileStack.createRoom} component={CreateRoom} />
    </Stack.Navigator>
  );
}
