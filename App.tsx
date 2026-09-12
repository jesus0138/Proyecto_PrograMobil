import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { useState } from 'react';
import Inicio from './src/components/Screens/LoginScreen';
import DashBoard from './src/components/DashBoard';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/Navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/components/Store/Store';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecefb9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});