import { View } from 'react-native';

import React, { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useAuth } from '../contexts/auth_context';
import { getUserByUsername } from '../apollo-client/queries/queries';

import LoadingScreen from '../components/loading_screen/loading_screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoContainer = ({ children }) => {
    const { authState, onLogout, onSetUserInfo } = useAuth();
    const [getUser, { loading, data }] = useLazyQuery(getUserByUsername);
    const [userInfo, setUserInfo] = useState(authState.user || {});

    useEffect(() => {
        async function getUserInfo() {
            if (Object.keys(userInfo).length === 0 && authState.authenticated) {
                const username = await AsyncStorage.getItem('user');
                getUser({ variables: { username: username } });
            }
        }
        getUserInfo();
    }, []);

    useEffect(() => {
        if (data) {
            setUserInfo(data.userByUsername);
            onSetUserInfo(data.userByUsername);
        }
    }, [data]);

    const memoizedUserInfo = useMemo(() => userInfo, [userInfo]);

    if (
        loading ||
        (authState.authenticated &&
            Object.keys(userInfo).length === 0 &&
            Object.keys(authState.user).length === 0)
    )
        return <LoadingScreen message={'Đang tải thông tin người dùng'} />;

    return <View style={{ flex: 1 }}>{children}</View>;
};

export default UserInfoContainer;
