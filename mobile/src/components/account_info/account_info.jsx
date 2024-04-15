import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';

import React, { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useAuth } from '../../contexts/auth_context';
import colors from '../../constants/colors';
import { BUTTON_HEIGHT } from '../../constants/style';
import { getUserByUsername } from '../../graphql-client/queries/users';

import LoadingScreen from '../../components/loading_screen/loading_screen';
import UserInfoContainer from '../../containers/user_info_container';

const AccountInfo = () => {
    const { authState, onLogout, onSetUserInfo } = useAuth();

    function handleLogout() {
        onLogout();
    }

    return (
        <UserInfoContainer>
            <View style={styles.accountInfoContainer}>
                <Text>Xin chào {authState.user.full_name}</Text>
                <TouchableHighlight
                    style={styles.buttonLogout}
                    onPress={handleLogout}
                >
                    <Text style={{ color: colors.white }}>Logout</Text>
                </TouchableHighlight>
            </View>
        </UserInfoContainer>
    );
};

export default AccountInfo;

const styles = StyleSheet.create({
    accountInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLogout: {
        width: '40%',
        height: BUTTON_HEIGHT,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BUTTON_HEIGHT,
    },
});
