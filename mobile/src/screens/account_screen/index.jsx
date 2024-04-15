import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import React, { useEffect } from 'react';
import NotLogin from '../../components/not_login/not_login';
import AccountInfo from '../../components/account_info/account_info';
import { useAuth } from '../../contexts/auth_context';
import { useLoginMutation } from '../../graphql-client/mutations/services';

const AccountScreen = () => {
    const { authState } = useAuth();

    return (
        <View style={{ flex: 1 }}>
            {authState.authenticated ? <AccountInfo /> : <NotLogin />}
        </View>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({});
