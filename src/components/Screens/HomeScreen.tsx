import { View,Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { NativeBottomTabBarProps } from "@react-navigation/bottom-tabs/unstable";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabsParamList } from "../navigation/TabsNavigator";
import { navigationRef } from "../navigation/NavigationService";
import { CompositeScreenProps } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";



type NestedFeedProps = CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, 'HomeTab'>,
    NativeStackScreenProps<RootStackParamList>
>

export default function Home({route, navigation}: NestedFeedProps){
    //destructuring 
    // const {email} = route.params;

    //extrayendo objeto user del authContext por medio de hook useAuth
    const {user} = useAuth();

    const handleUserSettings = () =>{
        navigation.navigate('Profile');
    };
    //reset de historial de navegacion
    const handleLogout = () => {
        if (navigationRef.isReady()){
            navigationRef.reset({
                //indice del arreglo de rutas, con el cual indicamos la vista seleccionada al momento de resetear el stack navegacion
                index: 0,
                //es un arreglo para cual cada objeto representa una ruta en el *nuevo historial del stack
                routes: [{name:'LoginScreen'}],
            })
        }
    };
    //navegacion con historial activo
    const handleNavigate= () =>{
        navigation.navigate('LoginScreen');
    };
    return(
       <View>
        <Text>Hola {user?.email}, Bienvenido a Home</Text>
        <CustomButton 
            title="Ir a Preferencias de Usuario"
            onPress={handleUserSettings}
        />
        <CustomButton 
            title="Cerrar Sesion"
            variant="secondary"
            onPress={handleLogout}
        />
         <CustomButton 
            title="Ir atras"
            variant="secondary"
            onPress={handleNavigate}
        />
       </View> 
    )
} 