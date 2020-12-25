/* eslint-disable max-len */
import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Color, lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';
import authStack from './routes';
import LoadingScreen from './Shared/Loading';
import LoginScreen from './Login';
import RegisterScreen from './Register';

const TopTab = createMaterialTopTabNavigator();

function render(
  name: string,
  screen: any,
  activeTab: string,
  setActiveTab: any,
) {
  return (
    <TopTab.Screen
      name={name}
      component={activeTab === name ? screen : LoadingScreen}
      listeners={{ focus: () => setActiveTab(name) }}
    />
  );
}

function AuthTopTab() {
  const [activeTab, setActiveTab] = useState(authStack.loginScreen);
  return (
    <TopTab.Navigator
      // tabBar={(tabBarProps) => <MyTabBar {...tabBarProps} />}
      backBehavior="none"
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: {
          fontSize: 14,
          textTransform: 'none',
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: Color.grey,
        },
        indicatorStyle: {
          backgroundColor: lightPrimaryColor,
          // width: ((width - AppView.bodyPaddingHorizontal * 2) / 3) - PADDING_TAB * 2,
          // marginRight: PADDING_TAB,
          // marginLeft: PADDING_TAB,
        },
      }}
    >
      {render(
        authStack.loginScreen,
        LoginScreen,
        activeTab,
        setActiveTab,
      )}

      {render(
        authStack.registerScreen,
        RegisterScreen,
        activeTab,
        setActiveTab,
      )}

    </TopTab.Navigator>
  );
}

export default AuthTopTab;
