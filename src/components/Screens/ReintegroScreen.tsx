import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type ReintegroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reintegro'>;

type AsignacionActiva = {
  id: number;
  herramienta: { nombre: string; marca: string; color: string };
  persona: { nombre: string; cargo: string };
  cuadrilla: { numero: number; sector: string };
  cantidad: number;
  fechaAsignacion: string;
};

export default function ReintegroScreen({ navigation }: { navigation: ReintegroScreenNavigationProp }) {
  const [asignaciones, setAsignaciones] = useState<AsignacionActiva[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [procesandoId, setProcesandoId] = useState<number | null>(null);

  const cargarActivas = async () => {
    try {
      const response = await fetch('http://123.123.123.32:5000/api/AsignacionHerramienta/activas');

      if (!response.ok) {
        console.log('Error al cargar asignaciones activas:', response.status);
        return;
      }

      const data = await response.json();
      setAsignaciones(data);
    } catch (error) {
      console.log('Error de conexión:', error);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useEffect(() => {
    cargarActivas();
  }, []);

  const onRefresh = useCallback(() => {
    setRefrescando(true);
    cargarActivas();
  }, []);

  const devolver = async (id: number, estado: 'Buena' | 'Dañada') => {
    setProcesandoId(id);
    try {
      const response = await fetch(`http://123.123.123.32:5000/api/AsignacionHerramienta/${id}/devolver`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoDevolucion: estado }),
      });

      if (!response.ok) {
        const errorTexto = await response.text();
        Alert.alert('No se pudo reintegrar', errorTexto || 'Ocurrió un error al procesar la devolución.');
        return;
      }

      setAsignaciones((prev) => prev.filter((a) => a.id !== id));
      Alert.alert('Reintegro exitoso', `La herramienta fue marcada como devuelta (${estado}).`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setProcesandoId(null);
    }
  };

  const confirmarReintegro = (asignacion: AsignacionActiva) => {
    Alert.alert(
      'Reintegrar herramienta',
      `¿En qué estado regresa "${asignacion.herramienta.nombre}" (${asignacion.cantidad} unidad(es)) de parte de ${asignacion.persona.nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Dañada', style: 'destructive', onPress: () => devolver(asignacion.id, 'Dañada') },
        { text: 'Buen estado', onPress: () => devolver(asignacion.id, 'Buena') },
      ]
    );
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.cargandoTexto}>Cargando asignaciones activas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refrescando} onRefresh={onRefresh} />}
      >
        <Text style={styles.titulo}>Reintegro de Herramientas</Text>
        <Text style={styles.subtitulo}>{asignaciones.length} préstamos activos</Text>

        {asignaciones.length === 0 ? (
          <Text style={styles.vacioTexto}>No hay herramientas prestadas actualmente.</Text>
        ) : (
          asignaciones.map((asignacion) => (
            <TouchableOpacity
              key={asignacion.id}
              activeOpacity={0.8}
              disabled={procesandoId === asignacion.id}
              onPress={() => confirmarReintegro(asignacion)}
            >
              <View style={styles.itemCard}>
                <View style={styles.iconoCircular}>
                  <MaterialIcons name="build" size={24} color="white" />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemNombre}>{asignacion.herramienta.nombre}</Text>
                  <Text style={styles.itemDetalle}>
                    {asignacion.persona.nombre} · Cuadrilla {asignacion.cuadrilla.numero}
                  </Text>
                  <Text style={styles.itemDetalle}>Cantidad: {asignacion.cantidad}</Text>
                </View>

                {procesandoId === asignacion.id ? (
                  <ActivityIndicator size="small" color="#4CAF50" />
                ) : (
                  <MaterialIcons name="assignment-return" size={24} color="#FF9800" />
                )}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecefb9' },
  scrollContainer: { padding: 20, paddingTop: 50, paddingBottom: 30 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ecefb9' },
  cargandoTexto: { marginTop: 10, color: '#666', fontSize: 14 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 5 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 20 },
  vacioTexto: { textAlign: 'center', color: '#777', fontSize: 14, marginTop: 40 },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconoCircular: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: { flex: 1 },
  itemNombre: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  itemDetalle: { fontSize: 12, color: '#777', marginTop: 2 },
});