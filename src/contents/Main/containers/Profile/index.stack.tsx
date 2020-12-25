import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import profileStack from './routes';
import MoreScreen from './screens';
import RegisterOwner from './screens/RegisterOwner';
import Setting from './screens/Setting';
import MyAccount from './screens/MyAccount';
import MyProperty from './screens/MyProperty';
import CreateRoom from './screens/CreateRoom';
import ManageDetailProperty from './screens/ManageDetailProperty';
import EditRoom from './screens/EditRoom';
import ListBooking from './screens/ListBooking';
import ListBooked from './screens/ListBooked';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={profileStack.index} component={MoreScreen} />
      <Stack.Screen name={profileStack.registerOwner} component={RegisterOwner} />
      <Stack.Screen name={profileStack.setting} component={Setting} />
      <Stack.Screen name={profileStack.account} component={MyAccount} />
      <Stack.Screen name={profileStack.myProperty} component={MyProperty} />
      <Stack.Screen name={profileStack.createRoom} component={CreateRoom} />
      <Stack.Screen name={profileStack.editRoom} component={EditRoom} />
      <Stack.Screen name={profileStack.manageDetailProperty} component={ManageDetailProperty} />
      <Stack.Screen name={profileStack.listBooked} component={ListBooked} />
      <Stack.Screen name={profileStack.listBooking} component={ListBooking} />

    </Stack.Navigator>
  );
}
