import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import DashBoard from '../DashBoard';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />

      <Stack.Screen 
        name="Dashboard" 
        component={DashBoard} 
      />

    </Stack.Navigator>
  );
}