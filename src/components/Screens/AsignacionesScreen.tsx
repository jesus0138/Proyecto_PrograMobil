import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type AsignacionesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AsignacionesScreen'>;

export default function AsignacionesScreen({ navigation }: { navigation: AsignacionesScreenNavigationProp }) {

  const elegirTipoAsignacion = () => {
    Alert.alert(
      'Nueva Asignación',
      '¿Qué deseas asignar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Herramienta', onPress: () => navigation.navigate('Asignacion') },
        { text: 'Carro', onPress: () => navigation.navigate('AsignacionCarros') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.logoContainer}>
          <MaterialIcons name="assignment" size={50} color="white" />
        </View>

        <Text style={styles.titulo}>Asignaciones</Text>
        <Text style={styles.subtitulo}>Control de herramientas y vehículos en campo</Text>

        {/* 1. Nueva asignación */}
        <TouchableOpacity style={styles.opcionCard} activeOpacity={0.8} onPress={elegirTipoAsignacion}>
          <View style={[styles.iconoCircular, { backgroundColor: '#4CAF50' }]}>
            <MaterialIcons name="add-circle-outline" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Nueva Asignación</Text>
            <Text style={styles.opcionDescripcion}>Asigna una herramienta o vehículo</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

        {/* 2. Ver activas */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ActivasUnificadas')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#2196F3' }]}>
            <MaterialIcons name="visibility" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Asignaciones Activas</Text>
            <Text style={styles.opcionDescripcion}>Todo lo que está prestado ahora mismo</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

        {/* 3. Reintegros */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ReintegrosUnificados')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#FF9800' }]}>
            <MaterialIcons name="assignment-return" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Reintegros Pendientes</Text>
            <Text style={styles.opcionDescripcion}>Registra devoluciones</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

        {/* 4. Reportes */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Reporte')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#9C27B0' }]}>
            <MaterialIcons name="person-search" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Reportes por Persona</Text>
            <Text style={styles.opcionDescripcion}>¿Qué tiene cada técnico o cuadrilla?</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

        {/* 5. Historial */}
        <TouchableOpacity
          style={styles.opcionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HistorialCompleto')}
        >
          <View style={[styles.iconoCircular, { backgroundColor: '#607D8B' }]}>
            <MaterialIcons name="history" size={28} color="white" />
          </View>
          <View style={styles.opcionTexto}>
            <Text style={styles.opcionTitulo}>Historial Completo</Text>
            <Text style={styles.opcionDescripcion}>Todo lo asignado alguna vez</Text>
          </View>
          <MaterialIcons name="chevron-right" size={26} color="#999" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecefb9' },
  scrollContainer: { flexGrow: 1, alignItems: 'center', padding: 25, paddingTop: 60 },
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
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#222', textAlign: 'center' },
  subtitulo: { fontSize: 13, color: '#666', textAlign: 'center', marginTop: 5, marginBottom: 30 },
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
  opcionTexto: { flex: 1 },
  opcionTitulo: { fontSize: 16, fontWeight: 'bold', color: '#222', marginBottom: 3 },
  opcionDescripcion: { fontSize: 12, color: '#777' },
});