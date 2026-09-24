import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Store/Store';
import { setHerramientas } from '../Store/HerramientasSlide';
import { API_URL } from '../Store/config';

export default function GestionHerramientaScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const herramientas = useSelector((state: RootState) => state.herramientas.lista);

  const [modo, setModo] = useState<'nueva' | 'aumentar'>('nueva');
  const [enviando, setEnviando] = useState(false);

  // Campos para herramienta nueva
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState('');
  const [color, setColor] = useState('');
  const [stockInicial, setStockInicial] = useState('');
  const [valor, setValor] = useState('');

  // Campos para aumentar stock
  const [herramientaId, setHerramientaId] = useState<number | null>(null);
  const [cantidadAumentar, setCantidadAumentar] = useState('');

  const limpiarFormularioNueva = () => {
    setNombre(''); setMarca(''); setModelo(''); setTipo(''); setColor(''); setStockInicial(''); setValor('');
  };

  const crearHerramienta = async () => {
    if (!nombre.trim() || !marca.trim() || !modelo.trim() || !tipo.trim() || !color.trim() || !stockInicial.trim() || !valor.trim()) {
      Alert.alert('Campos incompletos', 'Completa todos los campos.');
      return;
    }

    const stockNumero = Number(stockInicial);
    const valorNumero = Number(valor);
    if (isNaN(stockNumero) || stockNumero < 0) {
      Alert.alert('Stock inválido', 'El stock debe ser un número válido.');
      return;
    }
    if (isNaN(valorNumero) || valorNumero < 0) {
      Alert.alert('Valor inválido', 'El valor debe ser un número válido.');
      return;
    }

    setEnviando(true);
    try {
      const response = await fetch(`${API_URL}/api/Herramientas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, marca, modelo, tipo, color,
          stock: stockNumero,
          valor: valorNumero,
        }),
      });

      if (!response.ok) {
        const errorTexto = await response.text();
        Alert.alert('No se pudo crear', errorTexto || 'Ocurrió un error.');
        return;
      }

      limpiarFormularioNueva();
      Alert.alert('Herramienta creada', 'Se agregó correctamente al catálogo.');
      await recargarHerramientas();
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  const aumentarStock = async () => {
    if (herramientaId === null) {
      Alert.alert('Falta información', 'Selecciona una herramienta.');
      return;
    }
    if (!cantidadAumentar.trim()) {
      Alert.alert('Falta información', 'Ingresa la cantidad a aumentar.');
      return;
    }

    const cantidadNumero = Number(cantidadAumentar);
    if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
      Alert.alert('Cantidad inválida', 'Debe ser un número mayor a cero.');
      return;
    }

    const herramientaActual = herramientas.find((h) => h.id === herramientaId);
    if (!herramientaActual) {
      Alert.alert('Error', 'No se encontró la herramienta seleccionada.');
      return;
    }

    setEnviando(true);
    try {
      const response = await fetch(`${API_URL}/api/Herramientas/${herramientaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: herramientaActual.nombre,
          marca: herramientaActual.marca,
          modelo: herramientaActual.modelo,
          tipo: herramientaActual.tipo,
          color: herramientaActual.color,
          stock: herramientaActual.stock + cantidadNumero,
          valor: herramientaActual.valor,
          fechaAdquisicion: herramientaActual.fechaAdquisicion,
        }),
      });

      if (!response.ok) {
        const errorTexto = await response.text();
        Alert.alert('No se pudo actualizar', errorTexto || 'Ocurrió un error.');
        return;
      }

      setCantidadAumentar('');
      setHerramientaId(null);
      Alert.alert('Stock actualizado', 'Se aumentó el stock correctamente.');
      await recargarHerramientas();
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  const recargarHerramientas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/Herramientas`);
      if (response.ok) {
        dispatch(setHerramientas(await response.json()));
      }
    } catch (error) {
      console.log('Error al recargar herramientas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <Text style={styles.titulo}>Gestión de Herramientas</Text>
        <Text style={styles.subtitulo}>Agrega una herramienta nueva o aumenta el stock</Text>

        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[styles.switchBoton, modo === 'nueva' && styles.switchBotonActivo]}
            onPress={() => setModo('nueva')}
          >
            <Text style={[styles.switchTexto, modo === 'nueva' && styles.switchTextoActivo]}>Nueva</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBoton, modo === 'aumentar' && styles.switchBotonActivo]}
            onPress={() => setModo('aumentar')}
          >
            <Text style={[styles.switchTexto, modo === 'aumentar' && styles.switchTextoActivo]}>Aumentar Stock</Text>
          </TouchableOpacity>
        </View>

        {modo === 'nueva' ? (
          <>
            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej. Taladro" />

            <Text style={styles.label}>Marca</Text>
            <TextInput style={styles.input} value={marca} onChangeText={setMarca} placeholder="Ej. Bosch" />

            <Text style={styles.label}>Modelo</Text>
            <TextInput style={styles.input} value={modelo} onChangeText={setModelo} placeholder="Ej. T500" />

            <Text style={styles.label}>Tipo</Text>
            <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Ej. Eléctrica" />

            <Text style={styles.label}>Color</Text>
            <TextInput style={styles.input} value={color} onChangeText={setColor} placeholder="Ej. Rojo" />

            <Text style={styles.label}>Stock inicial</Text>
            <TextInput style={styles.input} value={stockInicial} onChangeText={setStockInicial} keyboardType="numeric" placeholder="Ej. 20" />

            <Text style={styles.label}>Valor</Text>
            <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="numeric" placeholder="Ej. 600" />

            <TouchableOpacity style={styles.boton} onPress={crearHerramienta} disabled={enviando}>
              <Text style={styles.botonTexto}>{enviando ? 'Creando...' : 'Crear Herramienta'}</Text>
              <MaterialIcons name="add-circle-outline" size={22} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Herramienta</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={herramientaId} onValueChange={(v) => setHerramientaId(v)}>
                <Picker.Item label="Selecciona una herramienta..." value={null} />
                {herramientas.map((h) => (
                  <Picker.Item key={h.id} label={`${h.nombre} (stock actual: ${h.stock})`} value={h.id} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Cantidad a aumentar</Text>
            <TextInput
              style={styles.input}
              value={cantidadAumentar}
              onChangeText={setCantidadAumentar}
              keyboardType="numeric"
              placeholder="Ej. 10"
            />

            <TouchableOpacity style={styles.boton} onPress={aumentarStock} disabled={enviando}>
              <Text style={styles.botonTexto}>{enviando ? 'Actualizando...' : 'Aumentar Stock'}</Text>
              <MaterialIcons name="add" size={22} color="white" />
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecefb9' },
  scrollContainer: { padding: 20, paddingTop: 50, paddingBottom: 30 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 5 },
  subtitulo: { fontSize: 13, color: '#666', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 4, marginBottom: 20 },
  switchBoton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  switchBotonActivo: { backgroundColor: '#4CAF50' },
  switchTexto: { fontSize: 13, fontWeight: 'bold', color: '#666' },
  switchTextoActivo: { color: 'white' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 7, marginTop: 10 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  boton: {
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    gap: 8,
  },
  botonTexto: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});