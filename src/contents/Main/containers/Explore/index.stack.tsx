import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import exploreStack from './routes';
import ExploreScreen from './screens';
import SearchScreen from './screens/SearchScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={exploreStack.index} component={ExploreScreen} />
      <Stack.Screen name={exploreStack.searchScreen} component={SearchScreen} />
    </Stack.Navigator>
  );
}
