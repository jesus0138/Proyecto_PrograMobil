import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { API_URL } from '../Store/config';

type ReintegrosUnificadosNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ReintegrosUnificados'>;

type AsignacionHerramientaActiva = {
  id: number;
  herramienta: { nombre: string; marca: string };
  persona: { nombre: string };
  cuadrilla: { numero: number; sector: string };
  cantidad: number;
  fechaAsignacion: string;
};

type AsignacionCarroActiva = {
  id: number;
  carro: { placa: string; marca: string; modelo: string };
  persona: { nombre: string };
  fechaAsignacion: string;
};

type ItemUnificado = {
  id: number;
  claveUnica: string;
  tipo: 'herramienta' | 'carro';
  titulo: string;
  subtitulo: string;
  persona: string;
  fechaAsignacion: string;
};

export default function ReintegrosUnificados({ navigation }: { navigation: ReintegrosUnificadosNavigationProp }) {
  const [items, setItems] = useState<ItemUnificado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  const cargarActivas = async () => {
    try {
      const [respHerramientas, respCarros] = await Promise.all([
        fetch(`${API_URL}/api/AsignacionHerramienta/activas`),
        fetch(`${API_URL}/api/AsignacionCarro/activas`),
      ]);

      const herramientasActivas: AsignacionHerramientaActiva[] = respHerramientas.ok
        ? await respHerramientas.json()
        : [];

      const carrosActivos: AsignacionCarroActiva[] = respCarros.ok
        ? await respCarros.json()
        : [];

      const unifHerramientas: ItemUnificado[] = herramientasActivas.map((a) => ({
        id: a.id,
        claveUnica: `h-${a.id}`,
        tipo: 'herramienta',
        titulo: a.herramienta.nombre,
        subtitulo: `${a.herramienta.marca} · Cantidad: ${a.cantidad} · Cuadrilla ${a.cuadrilla.numero}`,
        persona: a.persona.nombre,
        fechaAsignacion: a.fechaAsignacion,
      }));

      const unifCarros: ItemUnificado[] = carrosActivos.map((a) => ({
        id: a.id,
        claveUnica: `c-${a.id}`,
        tipo: 'carro',
        titulo: `${a.carro.marca} ${a.carro.modelo}`,
        subtitulo: `Placa: ${a.carro.placa}`,
        persona: a.persona.nombre,
        fechaAsignacion: a.fechaAsignacion,
      }));

      const combinado = [...unifHerramientas, ...unifCarros].sort(
        (x, y) => new Date(y.fechaAsignacion).getTime() - new Date(x.fechaAsignacion).getTime()
      );

      setItems(combinado);
    } catch (error) {
      console.log('Error al cargar reintegros pendientes:', error);
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

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.cargandoTexto}>Cargando reintegros pendientes...</Text>
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
        <Text style={styles.titulo}>Reintegros Pendientes</Text>
        <Text style={styles.subtitulo}>{items.length} elemento(s) por devolver</Text>

        {items.length === 0 ? (
          <Text style={styles.vacioTexto}>No hay nada pendiente de reintegro.</Text>
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item.claveUnica}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ConfirmarReintegro', {
                  id: item.id,
                  tipo: item.tipo,
                  titulo: item.titulo,
                  subtitulo: `${item.persona} · ${item.subtitulo}`,
                })
              }
            >
              <View style={styles.itemCard}>
                <View
                  style={[
                    styles.iconoCircular,
                    { backgroundColor: item.tipo === 'herramienta' ? '#2196F3' : '#9C27B0' },
                  ]}
                >
                  <MaterialIcons
                    name={item.tipo === 'herramienta' ? 'build' : 'directions-car'}
                    size={24}
                    color="white"
                  />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemNombre}>{item.titulo}</Text>
                  <Text style={styles.itemDetalle}>{item.subtitulo}</Text>
                  <Text style={styles.itemDetalle}>{item.persona}</Text>
                </View>

                <MaterialIcons name="assignment-return" size={24} color="#FF9800" />
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemInfo: { flex: 1 },
  itemNombre: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  itemDetalle: { fontSize: 12, color: '#777', marginTop: 2 },
});