import { StyleSheet, Text, View,Button,Alert,TextInput} from 'react-native';
import { useState } from 'react';

interface props{
    titulo:string
    textoboton:string
}



export default function CustomButton({titulo,textoboton}:props){
const[edad,setedad]=useState("")
const mostrar_anios=()=>{
    const edad_numero=Number(edad)
    if (edad_numero>=18) {
        Alert.alert("es mayor de edad: ",edad)
    }else{
Alert.alert("es menor de edad: ",edad)

    };

}
return(
<View>
<Text> segundo componente</Text>
<Text>Edad: </Text>
<TextInput placeholder='Edad' value={edad} onChangeText={setedad}></TextInput>
<Button title='tocame' onPress={mostrar_anios}></Button>


</View>



);

}