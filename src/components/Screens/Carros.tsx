import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator,StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigation/AppNavigator';
type CarrosNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Carros'>;


interface Asignacion {
    id: number;
    personaId: number;
    carroId: number;
    asignadoPorUsuarioId: number;
    fechaAsignacion: string;
    fechaDevolucion?: string | null;
}

interface Formulario {
    personaId: string;
    carroId: string;
    asignadoPorUsuarioId: string;
}

const API_URL = 'http://192.168.1.19:5175/api/Carro';
export default function CarrosScreen({ navigation }: { navigation: CarrosNavigationProp })  {

const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
const [cargando, setCargando] = useState(false);

const [mostrarFormulario, setMostrarFormulario] = useState(false);
const [editando, setEditando] = useState<number | null>(null);

const [formulario, setFormulario] = useState<Formulario>({
        personaId: '',
        carroId: '',
        asignadoPorUsuarioId: '',
    });

useEffect(() => {
        obtenerAsignaciones();
}, []);

//Obtener asignaciones

const obtenerAsignaciones = async () => {
        try {
            setCargando(true);

            const respuesta = await fetch(API_URL);

            if (!respuesta.ok) {
                throw new Error('No se pudieron obtener las asignaciones');
            }

            const datos = await respuesta.json();

            setAsignaciones(datos);

        } catch (error) {
            console.log(error);

            Alert.alert(
                'Error',
                'No se pudieron cargar las asignaciones.'
            );

        } finally {
            setCargando(false);
        }
};

//Limpiar el formulario

const limpiarFormulario = () => {
        setFormulario({
            personaId: '',
            carroId: '',
            asignadoPorUsuarioId: '',
        });

        setEditando(null);
};

//Nueva asignacion

const nuevaAsignacion = () => {
        limpiarFormulario();
        setMostrarFormulario(true);
};

//Editar asignacion

const editarAsignacion = (asignacion: Asignacion) => {

        setFormulario({
            personaId: asignacion.personaId.toString(),
            carroId: asignacion.carroId.toString(),
            asignadoPorUsuarioId:
                asignacion.asignadoPorUsuarioId.toString(),
        });

        setEditando(asignacion.id);
        setMostrarFormulario(true);
};

//Guardar asignacion

const guardarAsignacion = async () => {

        if (
            formulario.personaId.trim() === '' ||
            formulario.carroId.trim() === '' ||
            formulario.asignadoPorUsuarioId.trim() === ''
        ) {
            Alert.alert(
                'Campos incompletos',
                'Por favor complete todos los campos.'
            );
            return;
        }

        const personaId = Number(formulario.personaId);
        const carroId = Number(formulario.carroId);
        const asignadoPorUsuarioId =
            Number(formulario.asignadoPorUsuarioId);

        if (
            isNaN(personaId) ||
            isNaN(carroId) ||
            isNaN(asignadoPorUsuarioId)
        ) {
            Alert.alert(
                'Error',
                'Los IDs deben ser números válidos.'
            );
            return;
        }

        const datos = {
            personaId,
            carroId,
            asignadoPorUsuarioId,
        };

        try {

            let respuesta;

            if (editando === null) {

//Crear
                respuesta = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datos),
                });

            } else {

//Editar
                respuesta = await fetch(
                    `${API_URL}/${editando}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(datos),
                    }
                );
            }

            if (!respuesta.ok) {

                const mensaje = await respuesta.text();

                throw new Error(
                    mensaje || 'No se pudo guardar la asignación'
                );
            }

            Alert.alert(
                'Éxito',
                editando === null
                    ? 'Asignación creada correctamente.'
                    : 'Asignación actualizada correctamente.'
            );

            limpiarFormulario();
            setMostrarFormulario(false);

            obtenerAsignaciones();

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Error',
                'No se pudo guardar la asignación.'
            );
        }
    };

//Eliminar asignacion

const eliminarAsignacion = (id: number) => {

        Alert.alert(
            'Eliminar asignación',
            '¿Está seguro de que desea eliminar esta asignación?',
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
                                `${API_URL}/${id}`,
                                {
                                    method: 'DELETE',
                                }
                            );

                            if (!respuesta.ok) {
                                throw new Error(
                                    'No se pudo eliminar'
                                );
                            }

                            Alert.alert(
                                'Éxito',
                                'Asignación eliminada correctamente.'
                            );

                            obtenerAsignaciones();

                        } catch (error) {

                            console.log(error);

                            Alert.alert(
                                'Error',
                                'No se pudo eliminar la asignación.'
                            );
                        }
                    },
                },
            ]
        );
    };

//Devolver vehiculo

const devolverVehiculo = (id: number) => {

        Alert.alert(
            'Registrar devolución',
            '¿Desea registrar la devolución de este vehículo?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Devolver',
                    onPress: async () => {

                        try {

                            const respuesta = await fetch(
                                `${API_URL}/${id}/devolver`,
                                {
                                    method: 'PATCH',
                                }
                            );

                            if (!respuesta.ok) {
                                throw new Error(
                                    'No se pudo registrar la devolución'
                                );
                            }

                            Alert.alert(
                                'Éxito',
                                'Devolución registrada correctamente.'
                            );

                            obtenerAsignaciones();

                        } catch (error) {

                            console.log(error);

                            Alert.alert(
                                'Error',
                                'No se pudo registrar la devolución.'
                            );
                    }
                },
            },
        ]
    );
};

//Formulario

if (mostrarFormulario) {

        return (
            <View style={styles.contenedor}>

                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ecefb9"
                />

                <ScrollView
                    contentContainerStyle={styles.formularioScroll}
                >

                    <TouchableOpacity
                        style={styles.botonRegresar}
                        onPress={() => {
                            limpiarFormulario();
                            setMostrarFormulario(false);
                        }}
                    >
                        <MaterialIcons
                            name="arrow-back"
                            size={25}
                            color="#333"
                        />

                        <Text style={styles.textoRegresar}>
                            Regresar
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.encabezadoFormulario}>

                        <MaterialIcons
                            name="assignment"
                            size={55}
                            color="#4CAF50"
                        />

                        <Text style={styles.titulo}>
                            {editando === null
                                ? 'Nueva asignación'
                                : 'Editar asignación'}
                        </Text>

                        <Text style={styles.subtitulo}>
                            Complete los datos de la asignación
                        </Text>

                    </View>

                    <View style={styles.tarjetaFormulario}>

                        <Text style={styles.etiqueta}>
                            ID de la persona
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ej. 1"
                            keyboardType="numeric"
                            value={formulario.personaId}
                            onChangeText={(texto) =>
                                setFormulario({
                                    ...formulario,
                                    personaId: texto,
                                })
                            }
                        />

                        <Text style={styles.etiqueta}>
                            ID del vehículo
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ej. 1"
                            keyboardType="numeric"
                            value={formulario.carroId}
                            onChangeText={(texto) =>
                                setFormulario({
                                    ...formulario,
                                    carroId: texto,
                                })
                            }
                        />

                        <Text style={styles.etiqueta}>
                            ID del usuario que asigna
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Ej. 1"
                            keyboardType="numeric"
                            value={formulario.asignadoPorUsuarioId}
                            onChangeText={(texto) =>
                                setFormulario({
                                    ...formulario,
                                    asignadoPorUsuarioId: texto,
                                })
                            }
                        />

                        <TouchableOpacity
                            style={styles.botonGuardar}
                            onPress={guardarAsignacion}
                        >
                            <MaterialIcons
                                name="save"
                                size={22}
                                color="white"
                            />

                            <Text style={styles.textoBoton}>
                                {editando === null
                                    ? 'Crear asignación'
                                    : 'Guardar cambios'}
                            </Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </View>
    );
}

//Lista principal

    return (
        <View style={styles.contenedor}>

            <StatusBar
                barStyle="dark-content"
                backgroundColor="#ecefb9"
            />

            <ScrollView
                contentContainerStyle={styles.scroll}
            >

                <View style={styles.encabezado}>

                    <View>
                        <Text style={styles.titulo}>
                            Asignaciones
                        </Text>

                        <Text style={styles.subtitulo}>
                            Gestión de vehículos asignados
                        </Text>
                    </View>

                    <MaterialIcons
                        name="assignment"
                        size={50}
                        color="#4CAF50"
                    />

                </View>

                <TouchableOpacity
                    style={styles.botonNuevo}
                    onPress={nuevaAsignacion}
                >
                    <MaterialIcons
                        name="add"
                        size={25}
                        color="white"
                    />

                    <Text style={styles.textoBoton}>
                        Nueva asignación
                    </Text>
                </TouchableOpacity>

                <View style={styles.tarjetaContador}>

                    <MaterialIcons
                        name="assignment"
                        size={30}
                        color="#4CAF50"
                    />

                    <View>
                        <Text style={styles.textoContador}>
                            Asignaciones registradas
                        </Text>

                        <Text style={styles.numeroContador}>
                            {asignaciones.length}
                        </Text>
                    </View>

                </View>

                {cargando ? (

                    <ActivityIndicator
                        size="large"
                        color="#4CAF50"
                        style={styles.cargando}
                    />

                ) : asignaciones.length === 0 ? (

                    <View style={styles.vacio}>

                        <MaterialIcons
                            name="assignment-late"
                            size={60}
                            color="#888"
                        />

                        <Text style={styles.textoVacio}>
                            No hay asignaciones registradas.
                        </Text>

                    </View>

                ) : (

                    asignaciones.map((asignacion) => (

                        <View
                            key={asignacion.id}
                            style={styles.tarjeta}
                        >

                            <View style={styles.tarjetaTitulo}>

                                <View style={styles.iconoVehiculo}>
                                    <MaterialIcons
                                        name="directions-car"
                                        size={28}
                                        color="#4CAF50"
                                    />
                                </View>

                                <View style={styles.infoTitulo}>

                                    <Text style={styles.tituloTarjeta}>
                                        Asignación #{asignacion.id}
                                    </Text>

                                    <Text style={styles.estado}>
                                        {asignacion.fechaDevolucion
                                            ? 'Devuelto'
                                            : 'Activo'}
                                    </Text>

                                </View>

                            </View>

                            <View style={styles.separador} />

                            <Text style={styles.dato}>
                                👤 Persona ID: {asignacion.personaId}
                            </Text>

                            <Text style={styles.dato}>
                                🚗 Vehículo ID: {asignacion.carroId}
                            </Text>

                            <Text style={styles.dato}>
                                👨‍💼 Asignado por: {
                                    asignacion.asignadoPorUsuarioId
                                }
                            </Text>

                            <Text style={styles.dato}>
                                📅 Fecha de asignación:{' '}
                                {new Date(
                                    asignacion.fechaAsignacion
                                ).toLocaleDateString()}
                            </Text>

                            {asignacion.fechaDevolucion && (
                                <Text style={styles.dato}>
                                    ↩️ Fecha de devolución:{' '}
                                    {new Date(
                                        asignacion.fechaDevolucion
                                    ).toLocaleDateString()}
                                </Text>
                            )}

                            <View style={styles.botones}>

                                <TouchableOpacity
                                    style={styles.botonEditar}
                                    onPress={() =>
                                        editarAsignacion(asignacion)
                                    }
                                >
                                    <MaterialIcons
                                        name="edit"
                                        size={20}
                                        color="white"
                                    />

                                    <Text style={styles.textoBoton}>
                                        Editar
                                    </Text>
                                </TouchableOpacity>

                                {!asignacion.fechaDevolucion && (
                                    <TouchableOpacity
                                        style={styles.botonDevolver}
                                        onPress={() =>
                                            devolverVehiculo(
                                                asignacion.id
                                            )
                                        }
                                    >
                                        <MaterialIcons
                                            name="assignment-return"
                                            size={20}
                                            color="white"
                                        />

                                        <Text style={styles.textoBoton}>
                                            Devolver
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity
                                    style={styles.botonEliminar}
                                    onPress={() =>
                                        eliminarAsignacion(
                                            asignacion.id
                                        )
                                    }
                                >
                                    <MaterialIcons
                                        name="delete"
                                        size={20}
                                        color="white"
                                    />

                                    <Text style={styles.textoBoton}>
                                        Eliminar
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>

                    ))
                )}

            </ScrollView>

        </View>
    );
}

//Estilos

const styles = StyleSheet.create({

    contenedor: {
        flex: 1,
        backgroundColor: '#ecefb9',
    },

    scroll: {
        padding: 20,
        paddingBottom: 40,
    },

    formularioScroll: {
        padding: 20,
        paddingBottom: 40,
    },

    encabezado: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },

    encabezadoFormulario: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },

    subtitulo: {
        fontSize: 15,
        color: '#666',
        marginTop: 5,
    },

    botonNuevo: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 10,
        marginBottom: 15,
    },

    botonGuardar: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
        borderRadius: 10,
        marginTop: 15,
    },

    botonRegresar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    textoRegresar: {
        fontSize: 16,
        marginLeft: 5,
        color: '#333',
    },

    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 6,
    },

    tarjetaContador: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    textoContador: {
        color: '#666',
        fontSize: 14,
        marginLeft: 12,
    },

    numeroContador: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 12,
        marginTop: 2,
    },

    tarjeta: {
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 18,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    tarjetaTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconoVehiculo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e8f5e9',
        alignItems: 'center',
        justifyContent: 'center',
    },

    infoTitulo: {
        marginLeft: 12,
        flex: 1,
    },

    tituloTarjeta: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    estado: {
        marginTop: 4,
        fontWeight: 'bold',
        color: '#4CAF50',
    },

    separador: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },

    dato: {
        fontSize: 14,
        color: '#555',
        marginBottom: 7,
    },

    botones: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 7,
    },

    botonEditar: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    botonDevolver: {
        backgroundColor: '#607D8B',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    botonEliminar: {
        backgroundColor: '#D32F2F',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    tarjetaFormulario: {
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    etiqueta: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 7,
        marginTop: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 9,
        paddingHorizontal: 12,
        paddingVertical: 11,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },

    cargando: {
        marginTop: 30,
    },

    vacio: {
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 40,
        alignItems: 'center',
        marginTop: 10,
    },

    textoVacio: {
        fontSize: 16,
        color: '#777',
        marginTop: 12,
        textAlign: 'center',
    },
});

