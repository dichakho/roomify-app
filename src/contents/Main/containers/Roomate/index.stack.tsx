import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import roomateStack from './routes';
import ListRoomate from './screens';
import DetailRoomate from './screens/DetailRoomate';

const Stack = createStackNavigator();

export default function RoomateStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={roomateStack.index} component={ListRoomate} />
      <Stack.Screen name={roomateStack.detail} component={DetailRoomate} />
    </Stack.Navigator>
  );
}
