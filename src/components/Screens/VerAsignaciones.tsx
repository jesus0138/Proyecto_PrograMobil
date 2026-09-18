import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type VerAsignacionesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerAsignacionesScreen'>;

type Asignacion = {
  id: number;
  herramienta: { nombre: string; marca: string; modelo: string; color: string; valor: number };
  persona: { nombre: string; identidad: string; telefono: string; cargo: string };
  cuadrilla: { numero: number; sector: string };
  cantidad: number;
  fechaAsignacion: string;
  fechaDevolucion: string | null;
  estadoDevolucion: string | null;
};

export default function VerAsignacionesScreen({ navigation }: { navigation: VerAsignacionesScreenNavigationProp }) {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  const cargarAsignaciones = async () => {
    try {
      const response = await fetch('http://123.123.123.32:5000/api/AsignacionHerramienta');

      if (!response.ok) {
        console.log('Error al cargar asignaciones:', response.status);
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
    cargarAsignaciones();
  }, []);

  const onRefresh = useCallback(() => {
    setRefrescando(true);
    cargarAsignaciones();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.cargandoTexto}>Cargando asignaciones...</Text>
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
        <Text style={styles.titulo}>Asignaciones</Text>
        <Text style={styles.subtitulo}>{asignaciones.length} registros en total</Text>

        {asignaciones.length === 0 ? (
          <Text style={styles.vacioTexto}>No hay asignaciones registradas todavía.</Text>
        ) : (
          asignaciones.map((asignacion) => {
            // ---- AQUÍ el cambio: 3 estados en vez de 2 ----
            const estado = asignacion.fechaDevolucion === null
              ? 'Prestada'
              : asignacion.estadoDevolucion === 'Dañada'
              ? 'Dañada'
              : 'Devuelta';

            const colorFondo =
              estado === 'Prestada' ? '#fff3e0' : estado === 'Dañada' ? '#ffebee' : '#e8f5e9';
            const colorTexto =
              estado === 'Prestada' ? '#FF9800' : estado === 'Dañada' ? '#F44336' : '#4CAF50';
            // -------------------------------------------------

            return (
              <TouchableOpacity
                key={asignacion.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetallesAsignacionScreen', { asignacion })}
              >
                <View style={styles.itemCard}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemNombre}>{asignacion.herramienta?.nombre}</Text>
                    <View style={[styles.estadoBadge, { backgroundColor: colorFondo }]}>
                      <Text style={[styles.estadoTexto, { color: colorTexto }]}>
                        {estado}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.itemDetalle}>
                    {asignacion.persona?.nombre} · Cuadrilla {asignacion.cuadrilla?.numero} ({asignacion.cuadrilla?.sector})
                  </Text>
                  <Text style={styles.itemDetalle}>Cantidad: {asignacion.cantidad}</Text>
                  <Text style={styles.itemFecha}>
                    Asignado: {new Date(asignacion.fechaAsignacion).toLocaleDateString()}
                  </Text>
                  <View style={styles.verMasFila}>
                    <Text style={styles.verMasTexto}>Ver detalles</Text>
                    <MaterialIcons name="chevron-right" size={18} color="#4CAF50" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemNombre: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  itemDetalle: { fontSize: 13, color: '#555', marginTop: 2 },
  itemFecha: { fontSize: 12, color: '#999', marginTop: 6 },
  estadoBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  estadoTexto: { fontSize: 11, fontWeight: 'bold' },
  verMasFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  verMasTexto: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginRight: 2,
  },
});