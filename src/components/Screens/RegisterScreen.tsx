import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { useState } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: { navigation: RegisterScreenNavigationProp }) {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false);

  const handleRegister = () => {
    if (usuario.trim() === '' || contraseña.trim() === '' || confirmarContraseña.trim() === '') {
      Alert.alert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
    if (contraseña !== confirmarContraseña) {
      Alert.alert('Las contraseñas no coinciden', 'Verifique que ambas contraseñas sean iguales.');
      return;
    }
    // Aquí iría la lógica real de registro (API, Firebase, etc.)
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* Logo e icono */}
        <View style={styles.logoContainer}>
          <MaterialIcons name="person-add" size={50} color="white" />
        </View>

        <Text style={styles.titulo}>Control Inteligente</Text>

        <Text style={styles.subtitulo}>Herramientas y Vehículos en Campo</Text>

        {/* Tarjeta de registro */}
        <View style={styles.loginCard}>

          <Text style={styles.loginTitulo}>Crear Cuenta</Text>

          <Text style={styles.loginDescripcion}>
            Ingresa tus datos para registrarte en el sistema
          </Text>

          {/* Usuario */}
          <Text style={styles.label}>Usuario o correo electrónico</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={23} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su usuario"
              placeholderTextColor="#999"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
          </View>

          {/* Contraseña */}
          <Text style={styles.label}>Contraseña</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={23} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña"
              placeholderTextColor="#999"
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry={!mostrarContraseña}
            />
            <TouchableOpacity onPress={() => setMostrarContraseña(!mostrarContraseña)}>
              <Ionicons
                name={mostrarContraseña ? 'eye-off' : 'eye'}
                size={23}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Confirmar Contraseña */}
          <Text style={styles.label}>Confirmar contraseña</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={23} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Repita su contraseña"
              placeholderTextColor="#999"
              value={confirmarContraseña}
              onChangeText={setConfirmarContraseña}
              secureTextEntry={!mostrarConfirmarContraseña}
            />
            <TouchableOpacity onPress={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}>
              <Ionicons
                name={mostrarConfirmarContraseña ? 'eye-off' : 'eye'}
                size={23}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Botón */}
          <TouchableOpacity
            style={styles.boton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.botonTexto}>Crear Cuenta</Text>
            <MaterialIcons name="person-add" size={22} color="white" />
          </TouchableOpacity>

          {/* Enlace a Login */}
          <View style={styles.registroContainer}>
            <Text style={styles.registroTexto}>¿Ya tienes una cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.registroEnlace}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Pie de página */}
        <Text style={styles.footer}>Sistema de Control Inteligente</Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecefb9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 25,
  },
  loginCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  loginTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 5,
  },
  loginDescripcion: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
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
    marginTop: 5,
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  registroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  registroTexto: {
    fontSize: 13,
    color: '#777',
  },
  registroEnlace: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    color: '#777',
    fontSize: 11,
    marginTop: 25,
    textAlign: 'center',
  },
});