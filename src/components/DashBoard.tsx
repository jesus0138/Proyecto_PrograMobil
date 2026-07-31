import { StyleSheet, Text, View,Button,Alert,TextInput,TouchableOpacity,Image} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';


export default function Inicio(){
return (
   <View style={styles.container}>
<TuchableOpacity style={styles.boton} onPress={() => Alert.alert('Botón presionado')}>

            </TouchableOpacity>
            <StatusBar style="auto" />
</View>
        )


}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#ecefb9',
    alignItems: 'center',
    justifyContent: 'center',  }


    boton: {
        backgroundColor: '#4CAF50',
        padding: 10,    }
});


