import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlobalContainer from './global_container';
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
