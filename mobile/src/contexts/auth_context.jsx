import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
    useLoginMutation,
    useRegisterMutation,
} from '../graphql-client/mutations/services';

import { HomeName, LoginName } from '../constants/screen_names';

import {
    EXIST_GMAIL,
    EXIST_USERNAME,
    EXIST_USERNAMEGMAIL,
} from '../constants/backend';

import { showToast } from '../modules/feature_functions';
import { useLazyQuery } from '@apollo/client';
import {
    getAgentByID,
    getAgentByUserID,
} from '../graphql-client/queries/agents';

const TOKEN_KEY = 'jwt_secret_key_sfo';
const TOKEN = 'token';
const USER = 'user';
const USER_INFO = 'user_info';
const AGENT = 'agent';
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: '',
        user: {},
        username: '',
        authenticated: false,
    });

    const navigation = useNavigation();
    const loginFunc = useLoginMutation();
    const registerFunc = useRegisterMutation();

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem(TOKEN);
            const username = await AsyncStorage.getItem(USER);
            let id_agent = '';
            const user = await JSON.parse(
                await AsyncStorage.getItem(USER_INFO)
            );
            if (user?.is_agent) {
                const { data } = await useGetAgentByUserID({
                    variables: { agentByUserIdId: user.id },
                });
                id_agent = await AsyncStorage.getItem(AGENT);
            }
            if (token) {
                setAuthState((prev) => ({
                    ...prev,
                    token: token,
                    username: username,
                    authenticated: true,
                    user: user,
                    id_agent: id_agent,
                }));
            }
        };
        loadToken();
    }, []);

    const register = async (username, password, gmail) => {
        const res = await registerFunc(username, password, gmail);
        const isUser = res.username;
        if (isUser === EXIST_USERNAMEGMAIL)
            showToast('username và gmail đã tồn tại');
        else if (isUser === EXIST_USERNAME) showToast('username đã tồn tại');
        else if (isUser === EXIST_GMAIL) showToast('gmail đã được đăng ký');
        else {
            showToast('Đã đăng ký thành công');

            //auto login
            navigation.navigate(LoginName);
        }
    };

    const [useGetAgentByUserID] = useLazyQuery(getAgentByUserID);

    const login = async (username, password) => {
        const res = await loginFunc(username, password);
        if (res.token) {
            const token = res.token;
            const user = res.user;
            let id_agent = '';
            if (user.is_agent) {
                const { data } = await useGetAgentByUserID({
                    variables: { agentByUserIdId: user.id },
                });
                id_agent = data?.agentByUserID.id;
                await AsyncStorage.setItem(AGENT, id_agent);
            }

            await setAuthState({
                token: token,
                user: user,
                username: user.username,
                authenticated: true,
                id_agent: id_agent,
            });

            await AsyncStorage.setItem(TOKEN, token);
            await AsyncStorage.setItem(USER, user.username);
            await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
            await AsyncStorage.setItem(AGENT, id_agent);

            ToastAndroid.showWithGravity(
                'Đăng nhập thành công',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );

            navigation.navigate(HomeName);
            return res;
        }

        ToastAndroid.showWithGravity(
            'Đăng nhập thất bại',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );

        console.log('Login Failed', res);
        return null;
    };

    const logout = async () => {
        await AsyncStorage.removeItem(TOKEN);
        await AsyncStorage.removeItem(USER);
        await AsyncStorage.removeItem(USER_INFO);
        await AsyncStorage.removeItem(AGENT);

        setAuthState({
            token: '',
            user: {},
            username: '',
            authenticated: false,
        });

        ToastAndroid.showWithGravity(
            'Đã đăng xuất',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );

        navigation.navigate(HomeName);
    };

    function setUserInfo(user) {
        setAuthState((prev) => ({ ...prev, user: user }));
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState: authState,
        onSetUserInfo: setUserInfo,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

const styles = StyleSheet.create({});
