import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { API_URL } from '../Store/config';

type ReporteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Reporte'>;

type Persona = { id: number; nombre: string; cargo: string };
type Cuadrilla = { id: number; numero: number; sector: string };

type AsignacionHerramientaActiva = {
  id: number;
  herramienta: { nombre: string; marca: string };
  persona: { id: number; nombre: string };
  cuadrilla: { id: number; numero: number; sector: string };
  personaId?: number;
  cuadrillaId?: number;
  cantidad: number;
  fechaAsignacion: string;
  fechaDevolucion?: string | null;
};

type AsignacionCarroActiva = {
  id: number;
  carro: { placa: string; marca: string; modelo: string };
  persona: { nombre: string };
  fechaAsignacion: string;
};

type ItemUnificado = {
  claveUnica: string;
  tipo: 'herramienta' | 'carro';
  titulo: string;
  subtitulo: string;
  fechaAsignacion: string;
};

export default function ReporteScreen({ navigation }: { navigation: ReporteScreenNavigationProp }) {
  const [modo, setModo] = useState<'persona' | 'cuadrilla'>('persona');

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [cuadrillas, setCuadrillas] = useState<Cuadrilla[]>([]);
  const [seleccionId, setSeleccionId] = useState<number | null>(null);

  const [resultados, setResultados] = useState<ItemUnificado[]>([]);
  const [cargandoListas, setCargandoListas] = useState(true);
  const [cargandoResultados, setCargandoResultados] = useState(false);

  useEffect(() => {
    const cargarListas = async () => {
      try {
        const [respPersonas, respCuadrillas] = await Promise.all([
          fetch(`${API_URL}/api/Persona`),
          fetch(`${API_URL}/api/Cuadrilla`),
        ]);

        if (respPersonas.ok) setPersonas(await respPersonas.json());
        if (respCuadrillas.ok) setCuadrillas(await respCuadrillas.json());
      } catch (error) {
        console.log('Error al cargar listas:', error);
      } finally {
        setCargandoListas(false);
      }
    };

    cargarListas();
  }, []);

  useEffect(() => {
    setSeleccionId(null);
    setResultados([]);
  }, [modo]);

  useEffect(() => {
    if (seleccionId === null) return;

    const cargarResultados = async () => {
      setCargandoResultados(true);
      try {
        const urlCarros = modo === 'persona'
          ? `${API_URL}/api/AsignacionCarro/persona/${seleccionId}`
          : `${API_URL}/api/AsignacionCarro/cuadrilla/${seleccionId}`;

        const [respHerramientas, respCarros] = await Promise.all([
          fetch(`${API_URL}/api/AsignacionHerramienta`),
          fetch(urlCarros),
        ]);

        const todasLasHerramientas: AsignacionHerramientaActiva[] = respHerramientas.ok
          ? await respHerramientas.json()
          : [];
        const herramientas = todasLasHerramientas.filter((asignacion) => {
          const idRelacionado = modo === 'persona'
            ? asignacion.persona?.id ?? asignacion.personaId
            : asignacion.cuadrilla?.id ?? asignacion.cuadrillaId;

          return idRelacionado === seleccionId && asignacion.fechaDevolucion == null;
        });

        const carros: AsignacionCarroActiva[] = respCarros.ok
          ? await respCarros.json()
          : [];

        const unifHerramientas: ItemUnificado[] = herramientas.map((a) => ({
          claveUnica: `h-${a.id}`,
          tipo: 'herramienta',
          titulo: a.herramienta.nombre,
          subtitulo: modo === 'persona'
            ? `${a.herramienta.marca} · Cantidad: ${a.cantidad} · Cuadrilla ${a.cuadrilla.numero}`
            : `${a.herramienta.marca} · Cantidad: ${a.cantidad} · ${a.persona.nombre}`,
          fechaAsignacion: a.fechaAsignacion,
        }));

        const unifCarros: ItemUnificado[] = carros.map((a) => ({
          claveUnica: `c-${a.id}`,
          tipo: 'carro',
          titulo: `${a.carro.marca} ${a.carro.modelo}`,
          subtitulo: modo === 'persona'
            ? `Placa: ${a.carro.placa}`
            : `Placa: ${a.carro.placa} · ${a.persona.nombre}`,
          fechaAsignacion: a.fechaAsignacion,
        }));

        setResultados([...unifHerramientas, ...unifCarros]);
      } catch (error) {
        console.log('Error al cargar resultados:', error);
      } finally {
        setCargandoResultados(false);
      }
    };

    cargarResultados();
  }, [seleccionId, modo]);

  if (cargandoListas) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <Text style={styles.titulo}>Reporte de Asignaciones</Text>
        <Text style={styles.subtitulo}>Consulta qué tiene actualmente cada persona o cuadrilla</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.switchBoton, modo === 'persona' && styles.switchBotonActivo]}
            onPress={() => setModo('persona')}
          >
            <Text style={[styles.switchTexto, modo === 'persona' && styles.switchTextoActivo]}>
              Por Persona
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBoton, modo === 'cuadrilla' && styles.switchBotonActivo]}
            onPress={() => setModo('cuadrilla')}
          >
            <Text style={[styles.switchTexto, modo === 'cuadrilla' && styles.switchTextoActivo]}>
              Por Cuadrilla
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>{modo === 'persona' ? 'Selecciona una persona' : 'Selecciona una cuadrilla'}</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={seleccionId} onValueChange={(valor) => setSeleccionId(valor)}>
            <Picker.Item label="Selecciona..." value={null} />
            {modo === 'persona'
              ? personas.map((p) => (
                  <Picker.Item key={p.id} label={`${p.nombre} (${p.cargo})`} value={p.id} />
                ))
              : cuadrillas.map((c) => (
                  <Picker.Item key={c.id} label={`Cuadrilla ${c.numero} - ${c.sector}`} value={c.id} />
                ))}
          </Picker>
        </View>

        {cargandoResultados ? (
          <ActivityIndicator size="small" color="#4CAF50" style={{ marginTop: 20 }} />
        ) : seleccionId !== null && (
          <>
            <Text style={styles.resultadosTitulo}>
              {resultados.length} elemento(s) en poder actualmente
            </Text>

            {resultados.length === 0 ? (
              <Text style={styles.vacioTexto}>No tiene nada asignado actualmente.</Text>
            ) : (
              resultados.map((item) => (
                <View key={item.claveUnica} style={styles.itemCard}>
                  <View
                    style={[
                      styles.iconoCircular,
                      { backgroundColor: item.tipo === 'herramienta' ? '#2196F3' : '#9C27B0' },
                    ]}
                  >
                    <MaterialIcons
                      name={item.tipo === 'herramienta' ? 'build' : 'directions-car'}
                      size={22}
                      color="white"
                    />
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemNombre}>{item.titulo}</Text>
                    <Text style={styles.itemDetalle}>{item.subtitulo}</Text>
                  </View>
                </View>
              ))
            )}
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecefb9' },
  scrollContainer: { padding: 20, paddingTop: 50, paddingBottom: 30 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ecefb9' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 5 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 4, marginBottom: 20 },
  switchBoton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  switchBotonActivo: { backgroundColor: '#4CAF50' },
  switchTexto: { fontSize: 13, fontWeight: 'bold', color: '#666' },
  switchTextoActivo: { color: 'white' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 7 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 20,
    overflow: 'hidden',
  },
  resultadosTitulo: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10, marginTop: 5 },
  vacioTexto: { textAlign: 'center', color: '#777', fontSize: 14, marginTop: 20 },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconoCircular: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemInfo: { flex: 1 },
  itemNombre: { fontSize: 14, fontWeight: 'bold', color: '#222' },
  itemDetalle: { fontSize: 12, color: '#777', marginTop: 2 },
});