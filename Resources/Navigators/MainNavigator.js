import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import LibraryScreen from '../Screens/LibraryScreen';

const Tab = createBottomTabNavigator();

function MainNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons name="musical-notes" size={24} />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <Ionicons name="albums" size={24} />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default MainNavigator;