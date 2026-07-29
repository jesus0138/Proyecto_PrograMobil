import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Alert,TextInput} from 'react-native';
import { useState } from 'react';
import Inicio from './src/components/inicio';

export default function App() {
  
  return (
    <View style={styles.container }>
      <Inicio></Inicio>
    </View>
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
