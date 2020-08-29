import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AlertListScreen from './screens';
import alertStack from './routes';

const Stack = createStackNavigator();

export default function MailStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={alertStack.index} component={AlertListScreen} />
    </Stack.Navigator>
  );
}
