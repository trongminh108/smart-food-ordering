import { View } from 'react-native';

import React, { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useAuth } from '../contexts/auth_context';
import { getUserByUsername } from '../graphql-client/queries/queries';

import LoadingScreen from '../components/loading_screen/loading_screen';

const UserInfoContainer = ({ children }) => {
    const { authState, onLogout, onSetUserInfo } = useAuth();
    const [getUser, { loading, data }] = useLazyQuery(getUserByUsername);
    const [userInfo, setUserInfo] = useState(authState.user || {});

    useEffect(() => {
        if (Object.keys(userInfo).length === 0)
            getUser({ variables: { username: authState.username } });
    }, []);

    useEffect(() => {
        if (data) {
            setUserInfo(data.userByUsername);
            onSetUserInfo(data.userByUsername);
        }
    }, [data]);

    const memoizedUserInfo = useMemo(() => userInfo, [userInfo]);

    if (loading || Object.keys(userInfo).length === 0)
        return <LoadingScreen message={'Đang lấy thông tin người dùng'} />;

    return <View style={{ flex: 1 }}>{children}</View>;
};

export default UserInfoContainer;
