import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import exploreStack from './routes';
import ExploreScreen from './screens';
import SearchScreen from './screens/SearchScreen';
import DetailProperty from './screens/DetailProperty';
import CreatePropertyScreen from './screens/CreateProperty';

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={exploreStack.index} component={ExploreScreen} />
      <Stack.Screen name={exploreStack.searchScreen} component={SearchScreen} />
      <Stack.Screen
        name={exploreStack.detailProperty}
        component={DetailProperty}
      />
      <Stack.Screen
        name={exploreStack.createProperty}
        component={CreatePropertyScreen}
      />
    </Stack.Navigator>
  );
}
