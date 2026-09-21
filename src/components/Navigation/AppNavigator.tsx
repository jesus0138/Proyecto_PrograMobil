import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import Herramientas from '../Screens/HerramientasScreen';
import StockScreen from '../Screens/StockScreen';
import AsignacionScreen from '../Screens/AsignacionScreen';
import ReintegroScreen from '../Screens/ReintegroScreen';
import AsignacionCarros from '../Screens/AsignacionCarros';
import Carros from '../Screens/Carros';
import VerAsignacionesScreen from '../Screens/VerAsignaciones';
import DetallesAsignacionScreen from '../Screens/DetallesAsignacionScreen';
import InventarioScreen from '../Screens/Invertario';
import StockDanadas from '../Screens/StockDanadas';
import Reporte from '../Screens/Reporte';
import ActivasUnificadas from '../Screens/ActivasUnificadas';
import ConfirmarReintegroScreen from '../Screens/ConfirmarReintegro';
import ReintegrosUnificados from '../Screens/ReintegrosUnificados';
import AsignacionesScreen from '../Screens/AsignacionesScreen';
import HistorialCompleto from '../Screens/ReporteG';


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: undefined;
  Register: undefined;
  Herramientas: undefined;
  Stock: undefined;
  Asignacion: undefined;
  Reintegro: undefined;
  AsignacionCarros: undefined;
  Carros: undefined;
  VerAsignacionesScreen: undefined;
    DetallesAsignacionScreen: { asignacion: any }; // Parámetro para pasar la asignación seleccionada
  InventarioScreen: undefined;
  StockDanadas: undefined;
  Reporte: undefined;
  ActivasUnificadas: undefined;
  ConfirmarReintegro: {
    id: number;
    tipo: 'herramienta' | 'carro';
    titulo: string;
    subtitulo: string;
  };
  ReintegrosUnificados: undefined;
  AsignacionesScreen: undefined;
  HistorialCompleto: undefined;
 
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
      <Stack.Screen 
        name="AsignacionCarros" 
        component={AsignacionCarros} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Carros" 
        component={Carros} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="VerAsignacionesScreen" 
        component={VerAsignacionesScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DetallesAsignacionScreen" 
        component={DetallesAsignacionScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="InventarioScreen" 
        component={InventarioScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="StockDanadas" 
        component={StockDanadas} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Reporte" 
        component={Reporte} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ActivasUnificadas" 
        component={ActivasUnificadas} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ConfirmarReintegro" 
        component={ConfirmarReintegroScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ReintegrosUnificados" 
        component={ReintegrosUnificados} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AsignacionesScreen" 
        component={AsignacionesScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="HistorialCompleto" 
        component={HistorialCompleto} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}