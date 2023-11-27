import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewFeed from '../Screens/ViewFeed';
import PostFeed from '../Screens/PostFeed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const CustomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "blue",
                tabBarStyle: {
                    height: 60,
                    borderColor: 'blue',
                },
                tabBarLabelStyle: {
                    fontSize: 17,
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="View Feed"
                component={ViewFeed}
                options={{
                    tabBarLabel: 'View Feed',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faEye} size={22} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Post Feed"
                component={PostFeed}
                options={{
                    tabBarLabel: 'Post',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faCirclePlus} size={22} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default CustomTab;

const styles = StyleSheet.create({});
