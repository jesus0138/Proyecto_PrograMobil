import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { useState } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleLogin = () => {
    if (usuario.trim() === '' || contraseña.trim() === '') {
      Alert.alert(
        'Campos incompletos',
        'Por favor, ingrese su usuario y contraseña.'
      );
      return;
    }


    Alert.alert(
      'Inicio de sesión',
      'Bienvenido, ${usuario}'
    );
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

//logo e icono
        <View style={styles.logoContainer}>
          <MaterialIcons
            name="engineering"
            size={55}
            color="white"
          />
        </View>

//titulo
        <Text style={styles.titulo}>
//control inteligente
        </Text>

        <Text style={styles.subtitulo}>
//herramientas y vehiculos en Campo
        </Text>

//tarjeta de login
        <View style={styles.loginCard}>

          <Text style={styles.loginTitulo}>
//iniciar sesión
          </Text>

          <Text style={styles.loginDescripcion}>
//ingresa los datos para acceder al sistema
          </Text>

          {/* Usuario */}
          <Text style={styles.label}>
//usuario o correo electrónico
          </Text>

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="person"
              size={23}
              color="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="Ingrese su usuario"
              placeholderTextColor="#999"
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
            />
          </View>

//la contraseña
          <Text style={styles.label}>
//contraseña
          </Text>

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="lock"
              size={23}
              color="#666"
            />

            <TextInput
              style={styles.input}
              placeholder="Ingrese su contraseña"
              placeholderTextColor="#999"
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry={!mostrarContraseña}
            />

            <TouchableOpacity
              onPress={() =>
                setMostrarContraseña(!mostrarContraseña)
              }
            >
              <Ionicons
                name={
                  mostrarContraseña
                    ? 'eye-off'
                    : 'eye'
                }
                size={23}
                color="#666"
              />
            </TouchableOpacity>
          </View>

//boton
          <TouchableOpacity
            style={styles.boton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.botonTexto}>
//iniciar sesion
            </Text>

            <MaterialIcons
              name="login"
              size={22}
              color="white"
            />
          </TouchableOpacity>

//información
          <Text style={styles.ayuda}>
//problemas con el inicio de sesion
          </Text>

          <TouchableOpacity>
            <Text style={styles.enlace}>
//contacto con el administrador
            </Text>
          </TouchableOpacity>

        </View>

//pie de pagina
        <Text style={styles.footer}>
//sistema de control inteligente
        </Text>

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
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
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

  ayuda: {
    textAlign: 'center',
    color: '#777',
    fontSize: 12,
    marginTop: 22,
  },

  enlace: {
    textAlign: 'center',
    color: '#4CAF50',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },

  footer: {
    color: '#777',
    fontSize: 11,
    marginTop: 25,
    textAlign: 'center',
  },
});
