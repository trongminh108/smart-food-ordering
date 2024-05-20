'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import {
    useLoginMutation,
    useRegisterMutation,
} from '@/app/apollo-client/mutations/services';
import { AUTH_CONTEXT_TYPE, AUTH_STATE } from '@/app/constants/interfaces';
import {
    getCookies,
    parseJwt,
    removeCookiesLogin,
    setCookiesLogin,
} from '@/app/modules/feature_functions';

import {
    EXIST_GMAIL,
    EXIST_USERNAME,
    EXIST_USERNAMEGMAIL,
} from '../constants/backend';

const TOKEN_KEY = 'jwt_secret_key_sfo';
const TOKEN = 'token';
const USER = 'user';
const USER_INFO = 'user_info';
const AGENT = 'agent';
const AuthContext = createContext<AUTH_CONTEXT_TYPE | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AUTH_STATE>({
        token: '',
        user: {},
        username: '',
        authenticated: false,
        id_agent: '',
    });

    // const navigation = useNavigation();
    const loginFunc = useLoginMutation();
    const registerFunc = useRegisterMutation();

    useEffect(() => {
        const loadToken = async () => {
            const cookie = getCookies(TOKEN);

            if (cookie) {
                // const user = token.user;
                const user = JSON.parse(cookie);

                const username = user.username;
                let id_agent = '';
                if (user?.is_agent) {
                    id_agent = user.agent.id;
                }
                setAuthState((prev) => ({
                    ...prev,
                    token: getCookies(TOKEN),
                    username: username,
                    authenticated: true,
                    user: user,
                    id_agent: id_agent,
                }));
            }
        };
        loadToken();
    }, []);

    const register = async (
        username: string,
        password: string,
        gmail: string
    ) => {
        const res = await registerFunc(username, password, gmail);
        const isUser = res.username;
        if (isUser === EXIST_USERNAMEGMAIL)
            alert('username và gmail đã tồn tại');
        else if (isUser === EXIST_USERNAME) alert('username đã tồn tại');
        else if (isUser === EXIST_GMAIL) alert('gmail đã được đăng ký');
        else {
            alert('Đã đăng ký thành công');

            //auto login
            // navigation.navigate(LoginName);
            return true;
        }
    };

    const login = async (username: string, password: string) => {
        const res = await loginFunc(username, password);
        if (res.token) {
            const token = res.token;
            const user = res.user;

            let id_agent = '';
            if (user.is_agent) {
                id_agent = user?.agent?.id;
                // await AsyncStorage.setItem(AGENT, id_agent);
            }

            await setAuthState({
                token: token,
                user: user,
                username: user.username,
                authenticated: true,
                id_agent: id_agent,
            });

            const hash_token = await JSON.stringify(user);

            setCookiesLogin(hash_token);

            return res;
        }

        // ToastAndroid.showWithGravity(
        //     'Đăng nhập thất bại',
        //     ToastAndroid.SHORT,
        //     ToastAndroid.BOTTOM
        // );

        console.log('Login Failed', res);
        return null;
    };

    const logout = async () => {
        setAuthState({
            token: '',
            user: {},
            username: '',
            authenticated: false,
            id_agent: '',
        });

        removeCookiesLogin();

        return true;
        // navigation.navigate(HomeName);
    };

    function setUserInfo(user: object) {
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

export const useAuth = (): AUTH_CONTEXT_TYPE => {
    const context = useContext(AuthContext);
    if (!context) {
        console.log('This is not Auth Context');

        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
