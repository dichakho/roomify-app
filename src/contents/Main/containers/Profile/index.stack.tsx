import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import profileStack from './routes';
import MoreScreen from './screens';
import RegisterOwner from './screens/RegisterOwner';

const Stack = createStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={profileStack.index} component={MoreScreen} />
      <Stack.Screen name={profileStack.registerOwner} component={RegisterOwner} />
    </Stack.Navigator>
  );
}
