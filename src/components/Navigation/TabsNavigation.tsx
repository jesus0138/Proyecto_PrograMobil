import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import HerramientasScreen from '../Screens/HerramientasScreen';
import AsignacionesScreen from '../Screens/AsignacionesScreen';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabsParamList = {
    Inicio: undefined;
    Herramientas: undefined;
    Asignaciones: undefined;
};


const Tab = createBottomTabNavigator<TabsParamList>();


export default function TabsNavigator() {
    const insets = useSafeAreaInsets();

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor: '#4CAF50',

                tabBarInactiveTintColor: '#777',

                tabBarStyle: {
                    height: 65 + insets.bottom,
                    paddingBottom: 8 + insets.bottom,
                    paddingTop: 5,

                    backgroundColor: '#ffffff',

                    borderTopWidth: 1,
                    borderTopColor: '#ddd',
                },

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },

                tabBarIcon: ({ color, size }) => {

                    let iconName:
                        keyof typeof Ionicons.glyphMap;


                    if (route.name === 'Inicio') {

                        iconName = 'home-outline';

                    } else if (route.name === 'Herramientas') {

                        iconName = 'construct-outline';

                    } else {

                        iconName = 'car-outline';

                    }


                    return (

                        <Ionicons
                            name={iconName}
                            size={size}
                            color={color}
                        />

                    );

                },

            })}

        >

            {/* INICIO */}

            <Tab.Screen
                name="Inicio"
                component={HomeScreen}
                options={{
                    title: 'Inicio',
                }}
            />


            {/* HERRAMIENTAS */}

            <Tab.Screen
                name="Herramientas"
                component={HerramientasScreen}
                options={{
                    title: 'Herramientas',
                }}
            />


            {/* ASIGNACIONES */}

            <Tab.Screen
                name="Asignaciones"
                component={AsignacionesScreen}
                options={{
                    title: 'Asignaciones',
                }}
            />

        </Tab.Navigator>

    );

}
