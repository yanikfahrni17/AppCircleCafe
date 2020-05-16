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

const Tab = createMaterialTopTabNavigator();

const EventListStack = createStackNavigator();
function EventListStackScreen(){
  return (
    <EventListStack.Navigator>
      <EventListStack.Screen name="Events" component={EventList} options={{headerShown: false}}/>
      <EventListStack.Screen name="Detail" component={Detail} 
      options={({ route }) => ({ title: 'Infos', headerTitleStyle: {fontSize: 16}})} />
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
      //console.log('Permission settings:', settings);
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

