import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type StockDanadoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StockDanadas'>;

type AsignacionDanada = {
  id: number;
  herramienta: { id: number; nombre: string; marca: string };
  persona: { nombre: string };
  cuadrilla: { numero: number; sector: string };
  cantidad: number;
  fechaDevolucion: string;
};

type ResumenHerramienta = {
  herramientaId: number;
  nombre: string;
  marca: string;
  totalDanado: number;
  incidentes: AsignacionDanada[];
};

export default function StockDanadoScreen({ navigation }: { navigation: StockDanadoScreenNavigationProp }) {
  const [danadas, setDanadas] = useState<AsignacionDanada[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  const cargarDanadas = async () => {
    try {
      const response = await fetch('http://123.123.123.32:5000/api/AsignacionHerramienta/danadas');

      if (!response.ok) {
        console.log('Error al cargar herramientas dañadas:', response.status);
        return;
      }

      const data = await response.json();
      setDanadas(data);
    } catch (error) {
      console.log('Error de conexión:', error);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useEffect(() => {
    cargarDanadas();
  }, []);

  const onRefresh = useCallback(() => {
    setRefrescando(true);
    cargarDanadas();
  }, []);

  // Agrupar por herramienta
  const resumen: ResumenHerramienta[] = Object.values(
    danadas.reduce((acc, asignacion) => {
      const id = asignacion.herramienta.id;
      if (!acc[id]) {
        acc[id] = {
          herramientaId: id,
          nombre: asignacion.herramienta.nombre,
          marca: asignacion.herramienta.marca,
          totalDanado: 0,
          incidentes: [],
        };
      }
      acc[id].totalDanado += asignacion.cantidad;
      acc[id].incidentes.push(asignacion);
      return acc;
    }, {} as Record<number, ResumenHerramienta>)
  );

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#F44336" />
        <Text style={styles.cargandoTexto}>Cargando herramientas dañadas...</Text>
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
        <Text style={styles.titulo}>Herramientas Dañadas</Text>
        <Text style={styles.subtitulo}>
          {danadas.reduce((sum, a) => sum + a.cantidad, 0)} unidades dañadas en total
        </Text>

        {resumen.length === 0 ? (
          <Text style={styles.vacioTexto}>No hay herramientas dañadas registradas.</Text>
        ) : (
          resumen.map((item) => (
            <View key={item.herramientaId} style={styles.itemCard}>
              <View style={styles.iconoCircular}>
                <MaterialIcons name="build" size={24} color="white" />
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemNombre}>{item.nombre}</Text>
                <Text style={styles.itemDetalle}>{item.marca}</Text>
                <Text style={styles.itemDetalle}>{item.incidentes.length} incidente(s) registrado(s)</Text>
              </View>

              <View style={styles.danadoBadge}>
                <Text style={styles.danadoNumero}>{item.totalDanado}</Text>
                <Text style={styles.danadoLabel}>dañadas</Text>
              </View>
            </View>
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
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: { flex: 1 },
  itemNombre: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  itemDetalle: { fontSize: 12, color: '#777', marginTop: 2 },
  danadoBadge: {
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  danadoNumero: { fontSize: 18, fontWeight: 'bold', color: '#F44336' },
  danadoLabel: { fontSize: 10, color: '#F44336' },
});