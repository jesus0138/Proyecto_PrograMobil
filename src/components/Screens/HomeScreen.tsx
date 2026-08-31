import {StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {MaterialIcons} from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.bienvenida}>Bienvenido</Text>
            <Text style={styles.titulo}>Control Inteligente</Text>
            <Text style={styles.subtitulo}>Herramientas y Vehículos en Campo</Text>
          </View>

          <View style={styles.iconoPrincipal}>
            <MaterialIcons name="engineering" size={40} color="white" />
          </View>
        </View>

        {/* Tarjeta de información */}
        <View style={styles.tarjetaPrincipal}>
          <MaterialIcons name="dashboard" size={35} color="#4CAF50" />
          <View style={styles.infoPrincipal}>
            <Text style={styles.tarjetaTitulo}>Panel de Control</Text>
            <Text style={styles.tarjetaTexto}>
              Administra las herramientas, vehículos y recursos utilizados en campo desde un único lugar
            </Text>
          </View>
        </View>

        {/* Accesos rápidos */}
        <Text style={styles.seccionTitulo}>Accesos rápidos</Text>

        <View style={styles.grid}>

          {/* Herramientas */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconoCard}>
              <MaterialIcons name="build" size={32} color="white" />
            </View>
            <Text style={styles.cardTitulo}>Herramientas</Text>
            <Text style={styles.cardTexto}>Gestión de herramientas</Text>
          </TouchableOpacity>

          {/* Vehículos */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconoCard}>
              <MaterialIcons name="directions-car" size={32} color="white" />
            </View>
            <Text style={styles.cardTitulo}>Vehículos</Text>
            <Text style={styles.cardTexto}>Gestión de vehículos</Text>
          </TouchableOpacity>

          {/* Inventario */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconoCard}>
              <MaterialIcons name="inventory" size={32} color="white" />
            </View>
            <Text style={styles.cardTitulo}>Inventario</Text>
            <Text style={styles.cardTexto}>Ver recursos disponibles</Text>
          </TouchableOpacity>

          {/* Asignaciones */}
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconoCard}>
              <MaterialIcons name="assignment" size={32} color="white" />
            </View>
            <Text style={styles.cardTitulo}>Asignaciones</Text>
            <Text style={styles.cardTexto}>Consultar asignaciones</Text>
          </TouchableOpacity>

        </View>

        {/* Estado del sistema */}
        <Text style={styles.seccionTitulo}>Estado del sistema</Text>

        <View style={styles.estadoCard}>

          <View style={styles.estadoItem}>
            <View style={styles.estadoIcono}>
              <MaterialIcons name="inventory" size={25} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.estadoTitulo}>Inventario</Text>
              <Text style={styles.estadoTexto}>Sistema actualizado</Text>
            </View>
            <View style={styles.estadoActivo}>
              <Text style={styles.estadoActivoTexto}>Activo</Text>
            </View>
          </View>

          <View style={styles.separador} />

          <View style={styles.estadoItem}>
            <View style={styles.estadoIcono}>
              <MaterialIcons name="directions-car" size={25} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.estadoTitulo}>Vehículos</Text>
              <Text style={styles.estadoTexto}>Control disponible</Text>
            </View>
            <View style={styles.estadoActivo}>
              <Text style={styles.estadoActivoTexto}>Activo</Text>
            </View>
          </View>

        </View>

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
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  bienvenida: {
    fontSize: 16,
    color: '#666',
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 3,
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  iconoPrincipal: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tarjetaPrincipal: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  infoPrincipal: {
    flex: 1,
    marginLeft: 15,
  },
  tarjetaTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  tarjetaTexto: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  iconoCard: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardTexto: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  estadoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  estadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estadoIcono: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  estadoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  estadoTexto: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  estadoActivo: {
    marginLeft: 'auto',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  estadoActivoTexto: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  separador: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
});