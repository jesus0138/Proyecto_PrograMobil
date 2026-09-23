import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../components/screens/HomeScreen';
import HerramientasScreen from '../components/screens/HerramientasScreen';
import CarrosScreen from '../components/screens/carros';

export type TabsParamList = {
    Inicio: undefined;
    Herramientas: undefined;
    Asignaciones: undefined;
};


const Tab = createBottomTabNavigator<TabsParamList>();


export default function TabsNavigator() {

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarActiveTintColor: '#4CAF50',

                tabBarInactiveTintColor: '#777',

                tabBarStyle: {
                    height: 65,
                    paddingBottom: 8,
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
                component={CarrosScreen}
                options={{
                    title: 'Asignaciones',
                }}
            />

        </Tab.Navigator>

    );

}

