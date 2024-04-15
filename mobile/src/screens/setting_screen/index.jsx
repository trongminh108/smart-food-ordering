import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useAuth } from '../../contexts/auth_context';

import NotLogin from '../../components/not_login/not_login';

export default function SettingScreen() {
    const { authState } = useAuth();

    if (!authState.authenticated) return <NotLogin />;

    return (
        <View>
            <Text>SettingScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
