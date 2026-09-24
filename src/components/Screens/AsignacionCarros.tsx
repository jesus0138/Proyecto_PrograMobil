import { StyleSheet,  Text,  View,  TouchableOpacity, TextInput,  Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
import Carros from './Carros';
import { API_URL } from '../Store/config';


//nota importante
//cambiar la dirección por la ip de la computadora donde está corriendo
//tu API de ASP.NET.
//si se usa un celular físico, no usar localhost.
//ejemplo: const API_URL = 'http://numero de ip/api/Carro';

const RUTA_CARRO = `${API_URL}/api/Carro`;
const ESTADOS_CARRO = [
  { valor: 'Bueno', label: 'Buen estado', color: '#4CAF50', icono: 'check-circle' as const },
  { valor: 'Necesita mantenimiento', label: 'Necesita mantenimiento', color: '#FF9800', icono: 'build' as const },
  { valor: 'Dañado', label: 'Dañado', color: '#F44336', icono: 'error' as const },
  { valor: 'En reparación', label: 'En reparación', color: '#9E9E9E', icono: 'construction' as const },
];
type AsignacionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AsignacionCarros'>;
interface Carro {
    id: number;
    placa: string;
    vin: string;
    marca: string;
    modelo: string;
    anio: number;
    tipo: string;
    color: string;
    estado: string;
    fechaAdquisicion: string;
    valor: number;
}

export default function AsignacionesCarrosScreen({ navigation }: { navigation: AsignacionNavigationProp })  {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [cargando, setCargando] = useState(false);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState<Carro | null>(null);

  //campos del formulario
  const [placa, setPlaca] = useState('');
  const [vin, setVin] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [tipo, setTipo] = useState('');
  const [color, setColor] = useState('');
  const [estado, setEstado] = useState('');
  const [valor, setValor] = useState('');

//OBTENER VEHICULOS

const obtenerVehiculos = async () => {
    try {
      setCargando(true);

      const respuesta = await fetch(RUTA_CARRO);

      if (!respuesta.ok) {
        throw new Error('No se pudieron obtener los vehículos');
      }

      const datos = await respuesta.json();

      setCarros(datos);
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'No se pudieron cargar los vehículos. Verifica que el servidor esté funcionando.'
      );
    } finally {
      setCargando(false);
    }
};

//CARGAR VEHÍCULOS AL ABRIR LA PANTALLA

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  //LIMPIAR FORMULARIO

const limpiarFormulario = () => {
    setPlaca('');
    setVin('');
    setMarca('');
    setModelo('');
    setAnio('');
    setTipo('');
    setColor('');
    setEstado('');
    setValor('');

    setEditando(null);
  };

//ABRIR FORMULARIO PARA AGREGAR

const abrirNuevoVehiculo = () => {
    limpiarFormulario();
    setMostrarFormulario(true);
  };

//ABRIR FORMULARIO PARA EDITAR

const abrirEditarVehiculo = (carro: Carro) => {
    setEditando(carro);

    setPlaca(carro.placa);
    setVin(carro.vin);
    setMarca(carro.marca);
    setModelo(carro.modelo);
    setAnio(carro.anio.toString());
    setTipo(carro.tipo);
    setColor(carro.color);
    setEstado(carro.estado);
    setValor(carro.valor.toString());

    setMostrarFormulario(true);
};

  // GUARDAR VEHÍCULO

const guardarVehiculo = async () => {
if (
        placa.trim() === '' ||
        vin.trim() === '' ||
        marca.trim() === '' ||
        modelo.trim() === '' ||
        anio.trim() === '' ||
        tipo.trim() === '' ||
        color.trim() === '' ||
        estado.trim() === '' ||
        valor.trim() === ''
) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, complete todos los campos.'
      );

      return;
}

const anioNumero = Number(anio);
const valorNumero = Number(valor);
if (isNaN(anioNumero) || isNaN(valorNumero)) {
      Alert.alert(
        'Datos incorrectos',
        'El año y el valor deben ser números.'
      );

      return;
}
const vehiculo = {
      placa: placa.trim(),
      vin: vin.trim(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      anio: anioNumero,
      tipo: tipo.trim(),
      color: color.trim(),
      estado: estado.trim(),
      valor: valorNumero,
};

try {
    let respuesta;

      // EDITAR
      if (editando !== null) {
        respuesta = await fetch(
          `${RUTA_CARRO}/${editando.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehiculo),
          }
        );
      }

//CREAR
else {
        respuesta = await fetch(RUTA_CARRO, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vehiculo),
        });
}

if (!respuesta.ok) {
        const mensaje = await respuesta.text();

        Alert.alert(
          'Error',
          mensaje || 'No se pudo guardar el vehículo.'
        );

        return;
}

Alert.alert(
        'Éxito',
        editando
          ? 'Vehículo actualizado correctamente.'
          : 'Vehículo registrado correctamente.'
);

      limpiarFormulario();
      setMostrarFormulario(false);

      obtenerVehiculos();

} catch (error) {
      console.log(error);

    Alert.alert(
        'Error',
        'No se pudo conectar con el servidor.'
      );
    }
};

//ELIMINAR VEHÍCULO

const eliminarVehiculo = (id: number) => {
    Alert.alert(
      'Eliminar vehículo',
      '¿Está seguro de que desea eliminar este vehículo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Eliminar',
          style: 'destructive',

    onPress: async () => {
            try {
              const respuesta = await fetch(
                `${RUTA_CARRO}/${id}`,
                {
                  method: 'DELETE',
                }
              );

              if (!respuesta.ok) {
                throw new Error(
                  'No se pudo eliminar el vehículo'
                );
              }

              Alert.alert(
                'Éxito',
                'Vehículo eliminado correctamente.'
              );

              obtenerVehiculos();

            } catch (error) {
              console.log(error);

              Alert.alert(
                'Error',
                'No se pudo eliminar el vehículo.'
              );
            }
          },
        },
      ]
    );
  };

// FORMULARIO

if (mostrarFormulario) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />

        <ScrollView
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
        >

          {/* Encabezado */}

          <View style={styles.formHeader}>
            <TouchableOpacity
              onPress={() => {
                limpiarFormulario();
                setMostrarFormulario(false);
              }}
              style={styles.volver}
            >
              <MaterialIcons
                name="arrow-back"
                size={25}
                color="#222"
              />
            </TouchableOpacity>

            <Text style={styles.formTitulo}>
              {editando
                ? 'Editar vehículo'
                : 'Nuevo vehículo'}
            </Text>
          </View>

          {/* Icono */}

          <View style={styles.formIcono}>
            <MaterialIcons
              name="directions-car"
              size={45}
              color="white"
            />
          </View>

          {/* PLACA */}

          <Text style={styles.label}>
            Placa
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. HAA-1234"
            value={placa}
            onChangeText={setPlaca}
          />

          {/* VIN */}

          <Text style={styles.label}>
            VIN
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Número VIN"
            value={vin}
            onChangeText={setVin}
          />

          {/* MARCA */}

          <Text style={styles.label}>
            Marca
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Toyota"
            value={marca}
            onChangeText={setMarca}
          />

          {/* MODELO */}

          <Text style={styles.label}>
            Modelo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Hilux"
            value={modelo}
            onChangeText={setModelo}
          />

          {/* AÑO */}

          <Text style={styles.label}>
            Año
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. 2024"
            value={anio}
            onChangeText={setAnio}
            keyboardType="numeric"
          />

          {/* TIPO */}

          <Text style={styles.label}>
            Tipo de vehículo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Camioneta"
            value={tipo}
            onChangeText={setTipo}
          />

          {/* COLOR */}

          <Text style={styles.label}>
            Color
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. Blanco"
            value={color}
            onChangeText={setColor}
          />

          {/* ESTADO */}

          <Text style={styles.label}>
            Estado
          </Text>

          <View style={styles.estadosContainer}>
            {ESTADOS_CARRO.map((opcion) => (
              <TouchableOpacity
                key={opcion.valor}
                style={[
                  styles.estadoOpcion,
                  estado === opcion.valor && styles.estadoOpcionSeleccionada,
                  { borderColor: opcion.color },
                ]}
                onPress={() => setEstado(opcion.valor)}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name={estado === opcion.valor ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={24}
                  color={opcion.color}
                />
                <MaterialIcons name={opcion.icono} size={22} color={opcion.color} />
                <Text style={[styles.estadoOpcionTexto, { color: opcion.color }]}>
                  {opcion.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* VALOR */}

          <Text style={styles.label}>
            Valor
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ej. 500000"
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />

          {/* GUARDAR */}

          <TouchableOpacity
            style={styles.botonGuardar}
            onPress={guardarVehiculo}
          >
            <MaterialIcons
              name="save"
              size={22}
              color="white"
            />

            <Text style={styles.botonGuardarTexto}>
              {editando
                ? 'Guardar cambios'
                : 'Registrar vehículo'}
            </Text>
          </TouchableOpacity>

          {/* CANCELAR */}

          <TouchableOpacity
            style={styles.botonCancelar}
            onPress={() => {
              limpiarFormulario();
              setMostrarFormulario(false);
            }}
          >
            <Text style={styles.botonCancelarTexto}>
              Cancelar
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }

//LISTA PRINCIPAL
function obtenerColorEstado(estado: string): string {
  switch (estado) {
    case 'Bueno':
      return( '#4CAF50'); // verde
    case 'Reparación':
      return ('#FF9800'); // naranja
    case 'En uso':
      return ('#2196F3'); // azul
    default:
      return ('#9E9E9E'); // gris
  }
}

return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Encabezado */}

        <View style={styles.header}>

          <View>
            <Text style={styles.pequenoTitulo}>
              Control Inteligente
            </Text>

            <Text style={styles.titulo}>
              Vehículos
            </Text>

            <Text style={styles.subtitulo}>
              Administración de vehículos en campo
            </Text>
          </View>

          <View style={styles.headerIcono}>
            <MaterialIcons
              name="directions-car"
              size={35}
              color="white"
            />
          </View>

        </View>

        {/* Botón nuevo */}

        <TouchableOpacity
          style={styles.botonNuevo}
          onPress={abrirNuevoVehiculo}
        >
          <MaterialIcons
            name="add"
            size={25}
            color="white"
          />

          <Text style={styles.botonNuevoTexto}>
            Nuevo vehículo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonNuevo}
          onPress={() => navigation.navigate('Carros')}
        >
          <MaterialIcons
            name="assignment"
            size={25}
            color="white"
          />

          <Text style={styles.botonNuevoTexto}>
            Asignar vehículo
          </Text>
        </TouchableOpacity>

        {/* Título */}

        <View style={styles.listaHeader}>
          <Text style={styles.listaTitulo}>
            Vehículos registrados
          </Text>

          <Text style={styles.cantidad}>
            {carros.length}
          </Text>
        </View>

        {/* Cargando */}

        {cargando ? (
          <View style={styles.cargando}>
            <ActivityIndicator
              size="large"
              color="#4CAF50"
            />

            <Text style={styles.cargandoTexto}>
              Cargando vehículos...
            </Text>
          </View>
        ) : carros.length === 0 ? (

          /* Sin vehículos */

          <View style={styles.vacio}>
            <MaterialIcons
              name="directions-car"
              size={60}
              color="#aaa"
            />

            <Text style={styles.vacioTitulo}>
              No hay vehículos registrados
            </Text>

            <Text style={styles.vacioTexto}>
              Presiona "Nuevo vehículo" para registrar
              el primero.
            </Text>
          </View>

        ) : (

          /* Lista */

          carros.map((carro) => (
            <View
              key={carro.id}
              style={styles.carroCard}
            >

              {/* Icono */}

              <View style={styles.carroIcono}>
                <MaterialIcons
                  name="directions-car"
                  size={35}
                  color="white"
                />
              </View>

              {/* Información */}

              <View style={styles.carroInfo}>

                <Text style={styles.carroTitulo}>
                  {carro.marca} {carro.modelo}
                </Text>

                <Text style={styles.carroDato}>
                  Placa: {carro.placa}
                </Text>

                <Text style={styles.carroDato}>
                  Tipo: {carro.tipo}
                </Text>

                <Text style={styles.carroDato}>
                  Año: {carro.anio}
                </Text>

                <View style={styles.estadoContainer}>

                  <View style={[styles.puntoEstado, { backgroundColor: obtenerColorEstado(carro.estado) }]} />

                   <Text style={[styles.estadoTexto, { color: obtenerColorEstado(carro.estado) }]}>
                    {carro.estado}
                   </Text>

                 </View>

                 </View>

              {/* Botones */}

              <View style={styles.acciones}>

                <TouchableOpacity
                  style={styles.botonEditar}
                  onPress={() =>
                    abrirEditarVehiculo(carro)
                  }
                >
                  <MaterialIcons
                    name="edit"
                    size={21}
                    color="#1976D2"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botonEliminar}
                  onPress={() =>
                    eliminarVehiculo(carro.id)
                  }
                >
                  <MaterialIcons
                    name="delete"
                    size={21}
                    color="#D32F2F"
                  />
                </TouchableOpacity>

              </View>

            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  // GENERAL

  container: {
    flex: 1,
    backgroundColor: '#ecefb9',
  },

  scrollContainer: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  // HEADER

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  pequenoTitulo: {
    fontSize: 13,
    color: '#666',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitulo: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },

  headerIcono: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // BOTÓN NUEVO

  botonNuevo: {
    height: 52,
    backgroundColor: '#4CAF50',
    borderRadius: 12,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    elevation: 3,
  },

  botonNuevoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 7,
  },

  // LISTA

  listaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  listaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },

  cantidad: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },

  // TARJETA VEHÍCULO

  carroCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'flex-start',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,

    elevation: 3,
  },

  carroIcono: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },

  carroInfo: {
    flex: 1,
    marginLeft: 12,
  },

  carroTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },

  carroDato: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },

  estadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  puntoEstado: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },

  estadoTexto: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  // ACCIONES

  acciones: {
    marginLeft: 5,
    justifyContent: 'center',
    gap: 8,
  },

  botonEditar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botonEliminar: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // CARGANDO / VACÍO

  cargando: {
    alignItems: 'center',
    marginTop: 50,
  },

  cargandoTexto: {
    marginTop: 10,
    color: '#666',
  },

  vacio: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    elevation: 3,
  },

  vacioTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 12,
  },

  vacioTexto: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },

  // FORMULARIO

  formContainer: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  volver: {
    marginRight: 12,
  },

  formTitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
  },

  formIcono: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',

    paddingHorizontal: 12,
    fontSize: 14,

    marginBottom: 16,
  },

  estadosContainer: {
    marginBottom: 16,
  },

  estadoOpcion: {
    minHeight: 52,
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  estadoOpcionSeleccionada: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
  },

  estadoOpcionTexto: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  botonGuardar: {
    height: 52,
    backgroundColor: '#4CAF50',
    borderRadius: 10,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  botonGuardarTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  botonCancelar: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  botonCancelarTexto: {
    color: '#555',
    fontSize: 15,
    fontWeight: 'bold',
  },

});

