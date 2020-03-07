import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Feed from '../src/screens/Feed';
import LoginScreen from '../src/screens/LoginScreen';
import EventDetail from '../src/screens/EventDetail';
import Settings from '../src/screens/Settings';

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Events'
    }
  },
  Details: {
    screen: EventDetail,
    navigationOptions: ({ navigation }) => ({
      title: <Text>TestTitle</Text>,
      headerStyle: {
        fontWeight: 'bold',
        fontSize: 18
      }
    })
  }
});

export const Tabs = TabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarLabel: 'Events'
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        tabBarLabel: 'Login'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#ffda00',
      inactiveTintColor: '#b5b5b5',
      labelStyle: {
        fontSize: 14
      },
      style: {
        backgroundColor: '#333333'
      }
    }
  }
);

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings'
    }
  }
});

export const Root = StackNavigator(
  {
    Tabs: {
      screen: Tabs
    },
    Settings: {
      screen: SettingsStack
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);
