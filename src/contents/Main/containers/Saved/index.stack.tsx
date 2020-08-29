import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SavedListScreen from './screens';
import savedStack from './routes';

const Stack = createStackNavigator();

export default function SavedStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={savedStack.index} component={SavedListScreen} />
    </Stack.Navigator>
  );
}
