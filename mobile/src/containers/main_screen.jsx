import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Screens
import HomeScreen from '../screens/home_screen';
import DetailsScreen from '../screens/details_screen';
import SettingsScreen from '../screens/setting_screen';
import AccountScreen from '../screens/account_screen';
import AgentForUserScreen from '../screens/agent_for_user';
import OrderConfirmation from '../screens/order_confirmation';

import {
    HomeName,
    DetailsName,
    SettingsName,
    AccountName,
    AgentForUserName,
    OrderConfirmationName,
    LoginName,
    RegisterName,
    OrderName,
    FavoriteName,
    AgentName,
    DeliverName,
} from '../constants/screen_names';
import colors from '../constants/colors';
import LoginScreen from '../screens/login_screen';
import GlobalContainer from './global_container';
import RegisterScreen from '../screens/register_screen';
import TestScreen from '../screens/test';
import OrdersScreen from '../screens/order_screen';
import FavoriteScreen from '../screens/favorite_screen';
import AgentScreen from '../screens/agent_screen';
import { useAuth } from '../contexts/auth_context';
import DeliverScreen from '../screens/deliver_screen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
    const { authState } = useAuth();
    let initRoute = HomeName;

    if (authState?.authenticated && authState?.user.is_agent)
        initRoute = AgentName;
    else if (authState?.authenticated && authState?.user.is_deliver)
        initRoute = DeliverName;

    //set map here

    return (
        <Tab.Navigator
            initialRouteName={initRoute}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;
                    if (rn === HomeName) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (rn === OrderName) {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (rn === FavoriteName) {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (rn == AccountName) {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (rn == AgentName) {
                        iconName = focused ? 'business' : 'business-outline';
                    } else if (rn == DeliverName) {
                        iconName = focused ? 'bicycle' : 'bicycle-outline';
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70 },
                headerShown: false,
            })}
        >
            {authState.authenticated && authState.user.is_agent && (
                <Tab.Screen name={AgentName} component={AgentScreen} />
            )}
            {authState.authenticated && authState.user.is_deliver && (
                <Tab.Screen name={DeliverName} component={DeliverScreen} />
            )}
            <Tab.Screen name={HomeName} component={HomeScreen} />
            <Tab.Screen name={OrderName} component={OrdersScreen} />
            <Tab.Screen name={FavoriteName} component={FavoriteScreen} />
            <Tab.Screen name={AccountName} component={AccountScreen} />
            <Tab.Screen
                name={AgentForUserName}
                component={AgentForUserScreen}
                options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
                name={OrderConfirmationName}
                component={OrderConfirmation}
                options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
                name={LoginName}
                component={LoginScreen}
                options={{ tabBarButton: () => null }}
            />
            <Tab.Screen
                name={RegisterName}
                component={RegisterScreen}
                options={{ tabBarButton: () => null }}
            />
        </Tab.Navigator>
    );
};

export default MainScreen;

const Layout = ({ children }) => {
    return <GlobalContainer>{children}</GlobalContainer>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
