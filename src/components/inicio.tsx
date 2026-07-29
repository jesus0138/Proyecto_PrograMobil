import { StyleSheet, Text, View,Button,Alert,TextInput,TouchableOpacity} from 'react-native';
import { useState } from 'react';



export default function Inicio() {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");

    const handleLogin = () => {
        
        if (usuario.trim() === "" || contraseña.trim() === "") {
            Alert.alert("Error", "Por favor, ingrese nombre de usuario y contraseña");
            return;
        }

        setUsuario("");
        setContraseña("");
        Alert.alert("Inicio de sesión exitoso", `Bienvenido, ${usuario}`);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.Text1}>Inicio de sesión</Text>
            <Text style={styles.Text}>Nombre de usuario o correo</Text>
            <TextInput placeholder='usuario' value={usuario} onChangeText={setUsuario} style={styles.textInput}></TextInput>
            <Text style={styles.Text}>Contraseña</Text>
            <TextInput placeholder='contraseña' value={contraseña} onChangeText={setContraseña} secureTextEntry={true} style={styles.textInput}></TextInput>
            <TouchableOpacity style={styles.boton} onPress={handleLogin}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#ecefb9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },

  textInput: {
    height: 40,
    borderColor: 'black',
    backgroundColor: 'grey',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
  },
 

  Text:{
   
    fontSize: 20,
     color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  Text1:{
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 100,
  },

  boton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
 //sombras ios 
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.8,
 shadowRadius: 3,
 //sombras android
 elevation: 5,
  },
});