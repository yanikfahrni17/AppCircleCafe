/**
 * Sample React Native App with Firebase
 * https://github.com/invertase/react-native-firebase
 *
 * @format
 * @flow
 */

import React, { Component, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';


import EventList from './src/screens/EventList';
import BeerPass from './src/screens/BeerPass';
import MieteScreen from './src/screens/MieteScreen';
import Detail from './src/screens/Detail';
import Settings from './src/screens/Settings';



// TODO(you): import any additional firebase services that you require for your app, e.g for auth:
//    1) install the npm package: `yarn add @react-native-firebase/auth@alpha` - you do not need to
//       run linking commands - this happens automatically at build time now
//    2) rebuild your app via `yarn run run:android` or `yarn run run:ios`
//    3) import the package here in your JavaScript code: `import '@react-native-firebase/auth';`
//    4) The Firebase Auth service is now available to use here: `firebase.auth().currentUser`

const Tab = createMaterialTopTabNavigator();
const Infos = 'https://stackoverflow.com/questions/51786940/react-native-dynamically-created-components-not-rendering-on-first-click';

const EventListStack = createStackNavigator();
function EventListStackScreen(){
  return (
    <EventListStack.Navigator>
      <EventListStack.Screen name="Events" component={EventList} options={{headerShown: false}}/>
      <EventListStack.Screen name="Detail" component={Detail} 
      options={({ route }) => ({ title: 'Infos', headerTitleStyle: {fontSize: 16, fontWeight: 'bold'}})} />
      <EventListStack.Screen name="Settings" component={Settings} options={{headerTitle: 'Push-Einstellungen'}} />
    </EventListStack.Navigator>
  )
}
function App() {
  useEffect(() => {
    requestUserPermission();
  });
  const requestUserPermission = async () => {
    const settings = await messaging().requestPermission();
  
    if (settings) {
      console.log('Permission settings:', settings);
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
              tabBarOptions={{
                style: {backgroundColor: '#333'},
                activeTintColor: '#fcba03',
                inactiveTintColor: '#eee',
                indicatorStyle: {backgroundColor: '#fcba03'},
              }}
      >
        <Tab.Screen name="Events" component={EventListStackScreen} />
        <Tab.Screen name="Drinkpass" component={BeerPass} />
        <Tab.Screen name="Miete" component={MieteScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

