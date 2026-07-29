import { StyleSheet, Text, View,Button,Alert,TextInput} from 'react-native';
import { useState } from 'react';

interface props{
    titulo:string
    textoboton:string
}



export default function CustomButton({titulo,textoboton}:props){
const[edad,setedad]=useState("")
const mostrar_anios = () => {
    if (edad.trim() === "") {
        Alert.alert("error", "por favor ingrese una edad");
        return;
    }
    const edad_numero=Number(edad)
    if(isNaN(edad_numero)){
        Alert.alert("error","por favor ingrese un numero valido")
    }else if (edad_numero>=18) {
        Alert.alert("es mayor de edad: ",edad)
    }else {
Alert.alert("es menor de edad: ",edad)
};
setedad("")
}
return(
<View>
<Text> segundo componente</Text>
<Text>Edad: </Text>
<TextInput placeholder='Edad' value={edad} onChangeText={setedad}></TextInput>
<Button title='tocame' onPress={mostrar_anios}></Button>


</View>



);

};
