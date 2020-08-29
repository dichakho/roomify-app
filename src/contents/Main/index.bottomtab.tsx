/* eslint-disable no-confusing-arrow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  bottomNavigationBarHeight,
  shadowViewLight,
} from '@themes/ThemeComponent/Common/CommonProps';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';
import { lightTheme } from '@themes';
import { useSelector } from 'react-redux';
import { applyObjectSelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import { StyleSheet } from 'react-native';
import { Text } from '@components';
import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import mainBottomTab from './routes';
import HomeStack from './containers/Explore/index.stack';
import MoreStack from './containers/Profile/index.stack';
import MailStack from './containers/Alert/index.stack';
import SavedStack from './containers/Saved/index.stack';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const {
    theme: {
      colors: { bgColor, primary },
    },
    t,
  } = props;
  const loginSelectorData = useSelector((state) =>
    applyObjectSelector(loginSelector, state),
  );
  const isNotLogin = !loginSelectorData.data.get('token');

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        inactiveTintColor: primary,
        style: StyleSheet.flatten([
          {
            height: bottomNavigationBarHeight,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 5,
            borderTopColor: 'transparent',
            padding: 10,
            backgroundColor: bgColor,
          },
          {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
          },
        ]),
        tabStyle: {
          backgroundColor: bgColor,
          height: 55,
          paddingTop: 8,
          borderRadius: 20,
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
      }}>
      <BottomTabs.Screen
        name={mainBottomTab.exploreStack}
        component={HomeStack}
        options={{
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                color={lightPrimaryColor}
                fontSize="medium"
                t="bottom_tab:explore"
              />
            ) : (
              <Text
                fontSize="small"
                color="#000000"
                type="subtitle"
                t="bottom_tab:explore"
              />
            ),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon name="search" type="ionicons" color={color} size={28} />
            ) : (
              <Icon name="search" type="ionicons" color="#000000" size={24} />
            ),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.savedStack}
        component={SavedStack}
        options={{
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                color={lightPrimaryColor}
                fontSize="medium"
                t="bottom_tab:saved"
              />
            ) : (
              <Text
                fontSize="small"
                color="#000000"
                type="subtitle"
                t="bottom_tab:saved"
              />
            ),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon
                name="heart-outline"
                type="material-community"
                color={color}
                size={26}
              />
            ) : (
              <Icon
                name="heart-outline"
                type="material-community"
                color="#000000"
                size={22}
              />
            ),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.alertStack}
        component={MailStack}
        options={{
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                color={lightPrimaryColor}
                fontSize="medium"
                t="bottom_tab:alert"
              />
            ) : (
              <Text
                fontSize="small"
                color="#000000"
                type="subtitle"
                t="bottom_tab:alert"
              />
            ),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon name="bell" type="fontisto" color={color} size={25} />
            ) : (
              <Icon name="bell" type="fontisto" color="#000000" size={20} />
            ),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.profileStack}
        component={MoreStack}
        options={{
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <Text
                color={lightPrimaryColor}
                fontSize="medium"
                t="bottom_tab:profile"
              />
            ) : (
              <Text
                fontSize="small"
                color="#000000"
                type="subtitle"
                t="bottom_tab:profile"
              />
            ),
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Icon
                name="person-outline"
                type="ionicons"
                color={color}
                size={26}
              />
            ) : (
              <Icon
                name="person-outline"
                type="ionicons"
                color="#000000"
                size={22}
              />
            ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default compose(withTheme, withTranslation())(MainBottomTab);
