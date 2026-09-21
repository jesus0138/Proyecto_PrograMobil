import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmarReintegro'>;

const ESTADOS_HERRAMIENTA = [
  { valor: 'Buena', label: 'Buen estado', color: '#4CAF50', icono: 'check-circle' as const },
  { valor: 'Dañada', label: 'Dañada', color: '#F44336', icono: 'error' as const },
];

const ESTADOS_CARRO = [
  { valor: 'Bueno', label: 'Buen estado', color: '#4CAF50', icono: 'check-circle' as const },
  { valor: 'Necesita mantenimiento', label: 'Necesita mantenimiento', color: '#FF9800', icono: 'build' as const },
  { valor: 'Dañado', label: 'Dañado', color: '#F44336', icono: 'error' as const },
  { valor: 'En reparación', label: 'En reparación', color: '#9E9E9E', icono: 'construction' as const },
];

export default function ConfirmarReintegroScreen({ route, navigation }: Props) {
  const { id, tipo, titulo, subtitulo } = route.params;
  const [enviando, setEnviando] = useState(false);

  const estados = tipo === 'herramienta' ? ESTADOS_HERRAMIENTA : ESTADOS_CARRO;

  const confirmarEstado = (estado: string) => {
    Alert.alert(
      'Confirmar reintegro',
      `¿Marcar como "${estado}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => enviarReintegro(estado) },
      ]
    );
  };

  const enviarReintegro = async (estado: string) => {
    setEnviando(true);
    try {
      const url = tipo === 'herramienta'
        ? `http://192.168.1.19:5000/api/AsignacionHerramienta/${id}/devolver`
        : `http://192.168.1.19:5000/api/AsignacionCarro/${id}/devolver`;

      const response = await fetch(url, {
        method: tipo === 'herramienta' ? 'PUT' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoDevolucion: estado }),
      });

      if (!response.ok) {
        const errorTexto = await response.text();
        Alert.alert('No se pudo reintegrar', errorTexto || 'Ocurrió un error.');
        return;
      }

      Alert.alert('Reintegro exitoso', `Se marcó como "${estado}".`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.header}>
          <MaterialIcons name={tipo === 'herramienta' ? 'build' : 'directions-car'} size={40} color="#4CAF50" />
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>

        <Text style={styles.label}>¿En qué estado regresa?</Text>

        {enviando ? (
          <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 30 }} />
        ) : (
          estados.map((e) => (
            <TouchableOpacity
              key={e.valor}
              style={[styles.opcionCard, { borderColor: e.color }]}
              activeOpacity={0.8}
              onPress={() => confirmarEstado(e.valor)}
            >
              <MaterialIcons name={e.icono} size={26} color={e.color} />
              <Text style={[styles.opcionTexto, { color: e.color }]}>{e.label}</Text>
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
  header: { alignItems: 'center', marginBottom: 25 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#222', marginTop: 8, textAlign: 'center' },
  subtitulo: { fontSize: 13, color: '#666', marginTop: 4, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  opcionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  opcionTexto: { fontSize: 15, fontWeight: 'bold' },
});