import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'DetallesAsignacionScreen'>;

export default function DetallesAsignacionScreen({ route }: Props) {
  const { asignacion } = route.params;
  const activa = asignacion.fechaDevolucion === null;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.header}>
          <MaterialIcons name="build" size={40} color="#4CAF50" />
          <Text style={styles.titulo}>{asignacion.herramienta.nombre}</Text>
          <View style={[styles.estadoBadge, { backgroundColor: activa ? '#fff3e0' : '#e8f5e9' }]}>
            <Text style={[styles.estadoTexto, { color: activa ? '#FF9800' : '#4CAF50' }]}>
              {activa ? 'Prestada' : 'Devuelta'}
            </Text>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Herramienta</Text>
          <Text style={styles.dato}>Marca: {asignacion.herramienta.marca}</Text>
          <Text style={styles.dato}>Modelo: {asignacion.herramienta.modelo}</Text>
          <Text style={styles.dato}>Color: {asignacion.herramienta.color}</Text>
          <Text style={styles.dato}>Valor: L. {asignacion.herramienta.valor}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Persona</Text>
          <Text style={styles.dato}>Nombre: {asignacion.persona.nombre}</Text>
          <Text style={styles.dato}>Cargo: {asignacion.persona.cargo}</Text>
          <Text style={styles.dato}>Identidad: {asignacion.persona.identidad}</Text>
          <Text style={styles.dato}>Teléfono: {asignacion.persona.telefono}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Cuadrilla</Text>
          <Text style={styles.dato}>Número: {asignacion.cuadrilla.numero}</Text>
          <Text style={styles.dato}>Sector: {asignacion.cuadrilla.sector}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>Asignación</Text>
          <Text style={styles.dato}>Cantidad: {asignacion.cantidad}</Text>
          <Text style={styles.dato}>
            Fecha de asignación: {new Date(asignacion.fechaAsignacion).toLocaleString()}
          </Text>
          <Text style={styles.dato}>
            Fecha de devolución: {asignacion.fechaDevolucion ? new Date(asignacion.fechaDevolucion).toLocaleString() : 'Aún no devuelta'}
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecefb9' },
  scrollContainer: { padding: 20, paddingTop: 50, paddingBottom: 30 },
  header: { alignItems: 'center', marginBottom: 25 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#222', marginTop: 8 },
  estadoBadge: { marginTop: 8, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  estadoTexto: { fontSize: 12, fontWeight: 'bold' },
  seccion: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  seccionTitulo: { fontSize: 15, fontWeight: 'bold', color: '#4CAF50', marginBottom: 8 },
  dato: { fontSize: 14, color: '#333', marginBottom: 4 },
});