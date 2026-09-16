import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import VerAsignacionesScreen from './VerAsignaciones';

type HerramientasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Herramientas'>;

export default function HerramientasScreen({ navigation }: { navigation: HerramientasScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Logo e icono */}
        <View style={styles.logoContainer}>
          <MaterialIcons name="build" size={50} color="white" />
        </View>

        <Text style={styles.titulo}>Herramientas</Text>
        <Text style={styles.subtitulo}>Gestión de inventario y asignaciones</Text>

        {/* Botón: Ver Stock */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Stock')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#2196F3' }]}>
            <MaterialIcons name="inventory" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Ver Stock</Text>
            <Text style={styles.opcionDescripcion}>Consulta cuántas herramientas hay disponibles</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

        {/* Botón: Asignación */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Asignacion')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#4CAF50' }]}>
            <MaterialIcons name="assignment-turned-in" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Nueva Asignación</Text>
            <Text style={styles.opcionDescripcion}>Presta una herramienta a un técnico</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

        {/* Botón: Reintegro */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Reintegro')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#FF9800' }]}>
            <MaterialIcons name="assignment-return" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Reintegro</Text>
            <Text style={styles.opcionDescripcion}>Registra la devolución de una herramienta</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>
{/* Botón: Ver Asignaciones */}
<TouchableOpacity
  style={styles.opcionCard}
  activeOpacity={0.8}
  onPress={() => navigation.navigate('VerAsignacionesScreen')}
>
  <View style={[styles.iconoCircular, { backgroundColor: '#9C27B0' }]}>
    <MaterialIcons name="list-alt" size={28} color="white" />
  </View>
  <View style={styles.opcionTexto}>
    <Text style={styles.opcionTitulo}>Ver Asignaciones</Text>
    <Text style={styles.opcionDescripcion}>Consulta el historial de préstamos</Text>
  </View>
  <MaterialIcons name="chevron-right" size={26} color="#999" />
</TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecefb9',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 25,
    paddingTop: 60,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },
  opcionCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  iconoCircular: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  opcionTexto: {
    flex: 1,
  },
  opcionTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 3,
  },
  opcionDescripcion: {
    fontSize: 12,
    color: '#777',
  },
});