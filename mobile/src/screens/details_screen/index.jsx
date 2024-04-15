import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../../contexts/auth_context';
import NotLogin from '../../components/not_login/not_login';
import UserInfoContainer from '../../containers/user_info_container';

export default function DetailsScreen() {
    const { authState } = useAuth();

    if (!authState.authenticated) return <NotLogin />;

    return (
        <UserInfoContainer>
            <View>
                <Text>DetailsScreen</Text>
            </View>
        </UserInfoContainer>
    );
}

const styles = StyleSheet.create({});
