import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import DashBoard from '../DashBoard';
import RegisterScreen from '../Screens/RegisterScreen';


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  Register: undefined;
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
        name="Register" 
        component={RegisterScreen} 
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