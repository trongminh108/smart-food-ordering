import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserInfoContainer from '../../containers/user_info_container';
import { useAuth } from '../../contexts/auth_context';
import NotLogin from '../../components/not_login/not_login';

const FavoriteScreen = () => {
    const { authState } = useAuth();

    if (!authState.authenticated) return <NotLogin />;

    return (
        <View>
            <Text>FavoriteScreen</Text>
        </View>
    );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
