import { StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { setHerramientas } from '../Store/HerramientasSlide';
import { RootState, AppDispatch } from '../Store/Store';

type StockScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Stock'>;

type AsignacionDanada = {
  herramienta: { id: number };
  cantidad: number;
};

export default function StockScreen({ navigation }: { navigation: StockScreenNavigationProp }) {
  const dispatch = useDispatch<AppDispatch>();
  const herramientas = useSelector((state: RootState) => state.herramientas.lista);

  const [danadasPorHerramienta, setDanadasPorHerramienta] = useState<Record<number, number>>({});
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  const cargarHerramientas = async () => {
    try {
      const [responseHerramientas, responseDanadas] = await Promise.all([
        fetch('http://192.168.1.19:5000/api/Herramientas'),
        fetch('http://192.168.1.19:5000/api/AsignacionHerramienta/danadas'),
      ]);

      if (!responseHerramientas.ok) {
        console.log('Error al cargar herramientas:', responseHerramientas.status);
        return;
      }

      const dataHerramientas = await responseHerramientas.json();
      dispatch(setHerramientas(dataHerramientas));

      if (responseDanadas.ok) {
        const dataDanadas: AsignacionDanada[] = await responseDanadas.json();

        const resumen = dataDanadas.reduce((acc, asignacion) => {
          const id = asignacion.herramienta.id;
          acc[id] = (acc[id] || 0) + asignacion.cantidad;
          return acc;
        }, {} as Record<number, number>);

        setDanadasPorHerramienta(resumen);
      }
    } catch (error) {
      console.log('Error de conexión:', error);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useEffect(() => {
    cargarHerramientas();
  }, []);

  const onRefresh = useCallback(() => {
    setRefrescando(true);
    cargarHerramientas();
  }, []);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.cargandoTexto}>Cargando stock...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refrescando} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.titulo}>Stock de Herramientas</Text>
        <Text style={styles.subtitulo}>{herramientas.length} tipos de herramientas registradas</Text>

        {herramientas.length === 0 ? (
          <Text style={styles.vacioTexto}>No hay herramientas registradas todavía.</Text>
        ) : (
          herramientas.map((herramienta) => {
            const danadas = danadasPorHerramienta[herramienta.id] || 0;

            return (
              <View key={herramienta.id} style={styles.itemCard}>
                <View style={styles.iconoCircular}>
                  <MaterialIcons name="build" size={26} color="white" />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemNombre}>{herramienta.nombre}</Text>
                  <Text style={styles.itemDetalle}>{herramienta.marca} · {herramienta.color}</Text>
                  {danadas > 0 && (
                    <Text style={styles.itemDanado}>{danadas} dañada(s)</Text>
                  )}
                </View>

                <View style={styles.stockBadge}>
                  <Text style={styles.stockNumero}>{herramienta.stock - danadas}</Text>
                  <Text style={styles.stockLabel}>disponible</Text>
                </View>
              </View>
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
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: { flex: 1 },
  itemNombre: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  itemDetalle: { fontSize: 12, color: '#777', marginTop: 3 },
  itemDanado: { fontSize: 12, color: '#F44336', marginTop: 3, fontWeight: 'bold' },
  stockBadge: {
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  stockNumero: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  stockLabel: { fontSize: 10, color: '#4CAF50' },
});