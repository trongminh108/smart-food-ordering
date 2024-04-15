import { View, Text } from 'react-native';
import React from 'react';

import Providers from '../components/apollo_provider/apollo_provider';
import AuthProvider from '../contexts/auth_context';
import MapProvider from '../contexts/map_context';
import UserInfoContainer from './user_info_container';

const GlobalContainer = ({ children }) => {
    return (
        <Providers>
            <MapProvider>
                <AuthProvider>
                    {/* <UserInfoContainer> */}
                    {children}
                    {/* </UserInfoContainer> */}
                </AuthProvider>
            </MapProvider>
        </Providers>
    );
};

export default GlobalContainer;
