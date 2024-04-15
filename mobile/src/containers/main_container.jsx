import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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
} from '../constants/screen_names';
import colors from '../constants/colors';
import LoginScreen from '../screens/login_screen';
import GlobalContainer from './global_container';
import RegisterScreen from '../screens/register_screen';
import TestScreen from '../screens/test';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <GlobalContainer>
                    <Tab.Navigator
                        initialRouteName={HomeName}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                let rn = route.name;
                                if (rn === HomeName) {
                                    iconName = focused
                                        ? 'home'
                                        : 'home-outline';
                                } else if (rn === DetailsName) {
                                    iconName = focused
                                        ? 'list'
                                        : 'list-outline';
                                } else if (rn === SettingsName) {
                                    iconName = focused
                                        ? 'settings'
                                        : 'settings-outline';
                                } else if (rn == AccountName) {
                                    iconName = focused
                                        ? 'person'
                                        : 'person-outline';
                                }

                                // You can return any component that you like here!
                                return (
                                    <Ionicons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            },
                            tabBarActiveTintColor: colors.primary,
                            tabBarInactiveTintColor: 'grey',
                            labelStyle: { paddingBottom: 10, fontSize: 10 },
                            style: { padding: 10, height: 70 },
                            headerShown: false,
                        })}
                    >
                        <Tab.Screen name={HomeName} component={HomeScreen} />
                        <Tab.Screen
                            name={DetailsName}
                            component={DetailsScreen}
                        />
                        <Tab.Screen
                            name={SettingsName}
                            component={SettingsScreen}
                        />
                        <Tab.Screen
                            name={AccountName}
                            component={AccountScreen}
                        />
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
                </GlobalContainer>
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default MainContainer;

const Layout = ({ children }) => {
    return <GlobalContainer>{children}</GlobalContainer>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
