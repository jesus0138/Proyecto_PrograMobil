import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import Herramientas from '../Screens/HerramientasScreen';
import StockScreen from '../Screens/StockScreen';
import AsignacionScreen from '../Screens/AsignacionScreen';
import ReintegroScreen from '../Screens/ReintegroScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  Register: undefined;
  Herramientas: undefined;
  Stock: undefined;
  Asignacion: undefined;
  Reintegro: undefined;
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
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Herramientas" 
        component={Herramientas} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Stock" 
        component={StockScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Asignacion" 
        component={AsignacionScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Reintegro" 
        component={ReintegroScreen} 
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}