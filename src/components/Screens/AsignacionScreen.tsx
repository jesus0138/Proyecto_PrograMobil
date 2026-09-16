import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';

type AsignacionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Asignacion'>;

type Persona = {
  id: number;
  nombre: string;
  identidad: string;
  telefono: string;
  cargo: string;
  cuadrillaId: number;
};

export default function AsignacionScreen({ navigation }: { navigation: AsignacionScreenNavigationProp }) {
  const herramientas = useSelector((state: RootState) => state.herramientas.lista);

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [cargandoPersonas, setCargandoPersonas] = useState(true);

  const [herramientaId, setHerramientaId] = useState<number | null>(null);
  const [personaId, setPersonaId] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const cargarPersonas = async () => {
      try {
        const response = await fetch('http://192.168.1.19:5000/api/Persona');
        if (!response.ok) {
          console.log('Error al cargar personas:', response.status);
          return;
        }
        const data = await response.json();
        setPersonas(data);
      } catch (error) {
        console.log('Error de conexión al cargar personas:', error);
      } finally {
        setCargandoPersonas(false);
      }
    };

    cargarPersonas();
  }, []);

  const handleAsignar = async () => {
    if (herramientaId === null) {
      Alert.alert('Falta información', 'Selecciona una herramienta.');
      return;
    }
    if (personaId === null) {
      Alert.alert('Falta información', 'Selecciona una persona.');
      return;
    }
    if (cantidad.trim() === '') {
      Alert.alert('Falta información', 'Ingresa la cantidad a asignar.');
      return;
    }

    const cantidadNumero = Number(cantidad);
    if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
      Alert.alert('Cantidad inválida', 'La cantidad debe ser un número mayor a cero.');
      return;
    }

    const personaSeleccionada = personas.find((p) => p.id === personaId);
    if (!personaSeleccionada) {
      Alert.alert('Error', 'No se encontró la persona seleccionada.');
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch('http://192.168.1.19:5000/api/AsignacionHerramienta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          herramientaId: herramientaId,
          personaId: personaId,
          cuadrillaId: personaSeleccionada.cuadrillaId,
          cantidad: cantidadNumero,
        }),
      });

      if (!response.ok) {
        const errorTexto = await response.text();
        Alert.alert('No se pudo asignar', errorTexto || 'Ocurrió un error al crear la asignación.');
        return;
      }

      setHerramientaId(null);
      setPersonaId(null);
      setCantidad('');

      Alert.alert('Asignación creada', 'La herramienta fue asignada correctamente.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  if (cargandoPersonas) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.cargandoTexto}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <Text style={styles.titulo}>Nueva Asignación</Text>
        <Text style={styles.subtitulo}>Presta una herramienta a un técnico</Text>

        {/* Selector de Herramienta */}
        <Text style={styles.label}>Herramienta</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={herramientaId}
            onValueChange={(valor) => setHerramientaId(valor)}
          >
            <Picker.Item label="Selecciona una herramienta..." value={null} />
            {herramientas.map((herramienta) => (
              <Picker.Item
                key={herramienta.id}
                label={`${herramienta.nombre} (stock: ${herramienta.disponible})`}
                value={herramienta.id}
              />
            ))}
          </Picker>
        </View>

        {/* Selector de Persona */}
        <Text style={styles.label}>Persona</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={personaId}
            onValueChange={(valor) => setPersonaId(valor)}
          >
            <Picker.Item label="Selecciona una persona..." value={null} />
            {personas.map((persona) => (
              <Picker.Item
                key={persona.id}
                label={`${persona.nombre} (${persona.cargo})`}
                value={persona.id}
              />
            ))}
          </Picker>
        </View>

        {/* Cantidad */}
        <Text style={styles.label}>Cantidad</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="numbers" size={22} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Ej. 2"
            placeholderTextColor="#999"
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </View>

        {/* Botón */}
        <TouchableOpacity
          style={styles.boton}
          onPress={handleAsignar}
          activeOpacity={0.8}
          disabled={enviando}
        >
          <Text style={styles.botonTexto}>{enviando ? 'Asignando...' : 'Asignar Herramienta'}</Text>
          <MaterialIcons name="assignment-turned-in" size={22} color="white" />
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
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecefb9',
  },
  cargandoTexto: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 18,
    overflow: 'hidden',
  },
  inputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 10,
    color: '#222',
    fontSize: 14,
  },
  boton: {
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});