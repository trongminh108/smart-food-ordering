import React, { useCallback, useEffect, useRef } from 'react';

import { GG_MAP_API } from '@/app/constants/backend';
import { useAuth } from '@/app/contexts/auth_context';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

import Loading from '../loading/loading';

const containerStyle = {
    width: '100%',
    height: '500px',
};

function GGMapOrders(orders: { orders: any }) {
    const { authState } = useAuth();
    const agentName = authState.user.agent.name;
    const [map, setMap] = React.useState(null);
    const agentPosition = {
        lat: authState.user.agent.position[0],
        lng: authState.user.agent.position[1],
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GG_MAP_API,
    });

    const onLoad = useCallback(async function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = await new window.google.maps.LatLngBounds(agentPosition);
        await map.fitBounds(bounds);

        await setMap(map);
    }, []);

    const onUnmount = useCallback(async function callback(map: any) {
        await setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={agentPosition}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <MarkerF position={agentPosition} />
        </GoogleMap>
    ) : (
        <Loading message="Đang tải bản đồ..." />
    );
}

export default GGMapOrders;
