import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import exploreStack from './routes';
import ExploreScreen from './screens';
import SearchScreen from './screens/SearchScreen';
import DetailProperty from './screens/DetailProperty';
import CreatePropertyScreen from './screens/CreateProperty';
import MapScreen from './screens/Map';
import PropertyByCategory from './screens/PropertyByCategory';
import DetailRoom from './screens/DetailRoom';
import MapDetailRoom from './screens/MapDetailRoom';
import PropertyByCity from './screens/PropertyByCity';

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
        name={exploreStack.detailRoom}
        component={DetailRoom}
      />
      <Stack.Screen
        name={exploreStack.createProperty}
        component={CreatePropertyScreen}
      />
      <Stack.Screen
        name={exploreStack.map}
        component={MapScreen}
      />
      <Stack.Screen
        name={exploreStack.propsByCategory}
        component={PropertyByCategory}
      />
      <Stack.Screen name={exploreStack.mapDetailRoom} component={MapDetailRoom} />
      <Stack.Screen name={exploreStack.propertyByCity} component={PropertyByCity} />
    </Stack.Navigator>
  );
}
