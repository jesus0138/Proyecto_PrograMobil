import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button,Alert,TextInput} from 'react-native';
import { useState } from 'react';
import CustomButtom from './src/components/CustomButtom';

export default function App() {
  
  return (
    <View style={styles.container }>
      <Text style={{ marginBottom: 20 }}>Mi aplicación Mobil</Text>
     
     <CustomButtom titulo='Edad del usuario' textoboton='mostrar anios'></CustomButtom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
