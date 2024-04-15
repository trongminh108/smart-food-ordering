import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
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
    ReceiptName,
    FavoriteName,
    AgentName,
} from '../constants/screen_names';
import colors from '../constants/colors';
import LoginScreen from '../screens/login_screen';
import GlobalContainer from './global_container';
import RegisterScreen from '../screens/register_screen';
import TestScreen from '../screens/test';
import ReceiptScreen from '../screens/receipt_screen';
import FavoriteScreen from '../screens/favorite_screen';
import AgentScreen from '../screens/agent_screen';
import { useAuth } from '../contexts/auth_context';
import MainScreen from './main_screen';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <GlobalContainer>
                    <MainScreen />
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
