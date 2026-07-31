import { StyleSheet, Text, View,Button,Alert,TextInput,TouchableOpacity,Image} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';


export default function Modulos(){
return (


        <View style={styles.container2}>
           <Text style={styles.Titulo}>Inventario</Text> 

                     <TouchableOpacity style={styles.boton} >
<Text style={styles.boton}>Asignaciones</Text >
<Image source={require('./icon_asig.png')}style={{ width: 20, height: 20, marginLeft: 10 }}/>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.boton} >
<Text style={styles.boton}>Inventario</Text>
<Image source={require('./icon_asig.png')}style={{ width: 20, height: 20, marginLeft: 10 }}/>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.boton} >
<Text style={styles.boton}>herramientas</Text>
<Image source={require('./icon_asig.png')}style={{ width: 20, height: 20, marginLeft: 10 }}/>
                     </TouchableOpacity>
 
 <TouchableOpacity style={styles.boton} >
<Text style={styles.boton}>Entradas</Text>
<Image source={require('./icon_asig.png')}style={{ width: 20, height: 20, marginLeft: 10 }}/>
                     </TouchableOpacity>
                     
                     <TouchableOpacity style={styles.boton} >
<Text style={styles.boton}>Salidas</Text>
<Image source={require('./icon_asig.png')}style={{ width: 20, height: 20, marginLeft: 10 }}/>
                     </TouchableOpacity>

<TouchableOpacity style={styles.boton} >
<Text style={styles.boton}>Reportes</Text>
<Image source={require('./icon_asig.png')}style={{ width: 20, height: 20, marginLeft: 10 }}/>
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
    justifyContent: 'center',  
   
},
container2: { 
    flex: 1,
    backgroundColor: '#ecefb9',
    alignItems: 'center',
    justifyContent: 'center', 
    flexDirection: 'column', 
   
},


    Titulo: {
        fontSize: 24,
        color: 'pink',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    boton: {
        backgroundColor: '#4CAF50',
        padding: 10,  
     flexDirection: 'row',
     textAlign: 'center',
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    }
    
});


