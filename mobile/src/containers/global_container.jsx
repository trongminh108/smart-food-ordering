import { View, Text } from 'react-native';
import React from 'react';

import Providers from '../components/apollo_provider/apollo_provider';
import AuthProvider from '../contexts/auth_context';
import MapProvider from '../contexts/map_context';
import UserInfoContainer from './user_info_container';
import NotificationsProvider from '../contexts/notification_context';
import OSMProvider from '../contexts/osm_context';
import DeliverProvider from '../contexts/deliver_context';

const GlobalContainer = ({ children }) => {
    return (
        <Providers>
            <MapProvider>
                {/* <OSMProvider> */}
                <AuthProvider>
                    <DeliverProvider>
                        <NotificationsProvider>
                            {/* <UserInfoContainer> */}
                            {children}
                            {/* </UserInfoContainer> */}
                        </NotificationsProvider>
                    </DeliverProvider>
                </AuthProvider>
                {/* </OSMProvider> */}
            </MapProvider>
        </Providers>
    );
};

export default GlobalContainer;
