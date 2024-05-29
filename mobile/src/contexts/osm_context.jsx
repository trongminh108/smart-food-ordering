import { View, Text } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
    getAddress,
    getAddressOSM_Axios,
    getDistanceDurationOSM,
    getDistanceDurationOSM_Axios,
} from '../apollo-client/queries/osm';
import { getAllAgents } from '../apollo-client/queries/agents';
import {
    getUserLocation,
    removeCodeAddress,
} from '../modules/feature_functions';

const OSMContext = createContext({});

const OSMProvider = ({ children }) => {
    const [origins, setOrigins] = useState({});
    const [destinations, setDestinations] = useState({});
    const [distance, setDistance] = useState([]);
    const [distance_tmp, setDistance_tmp] = useState([]);
    const [duration, setDuration] = useState('');
    const [address, setAddress] = useState('Đang xác định');

    const [useGetAllAgentsQuery] = useLazyQuery(getAllAgents);

    async function getDistanceAllAgents(agents) {
        const data = [];
        for (const agent of agents) {
            data.push({
                id_agent: agent.id,
                position: agent.position,
                distance: 0,
                duration: 0,
            });
        }
        return data;
    }

    useEffect(() => {
        async function generateMap() {
            const { data } = await useGetAllAgentsQuery();
            const dataDistances = await getDistanceAllAgents(data?.agents);
            const latlng = await getUserLocation();
            await setOrigins(latlng);
            await setDistance_tmp(dataDistances);
        }
        generateMap();
    }, []);

    //get user address
    useEffect(() => {
        if (Object.keys(origins).length != 0) {
            async function getAddressOSM() {
                const res = await getAddressOSM_Axios(origins);
                setAddress(res);
            }
            getAddressOSM();
        }
    }, [origins]);

    //get distance and durations
    useEffect(() => {
        if (
            Object.keys(distance_tmp).length != 0 &&
            Object.keys(origins).length != 0
        ) {
            const promises = distance_tmp.map((agent) => {
                return fetchDistanceDuration(origins, {
                    lat: agent.position[0],
                    lng: agent.position[1],
                });
            });
            Promise.all(promises)
                .then(async (results) => {
                    const arr_res = [];
                    for (let i = 0; i < results.length; i++) {
                        arr_res.push({
                            ...distance_tmp[i],
                            distance: results[i].distance,
                            duration: results[i].duration,
                        });
                    }
                    await setDistance(arr_res);
                })
                .catch((error) => {
                    console.error(
                        'Error fetching distance and duration:',
                        error
                    );
                });
        }
    }, [distance_tmp, origins]);

    const fetchDistanceDuration = async (origins, destinations) => {
        const res = await getDistanceDurationOSM_Axios(origins, destinations);
        return res;
    };

    const value = {
        origins: { value: origins, setOrigins: setOrigins },
        address: { value: address, setAddress: setAddress },
        destinations: { value: destinations, setDestinations: setDestinations },
        distance: { value: distance, setDistance: setDistance },
        distance_tmp: { value: distance_tmp, setDistance_tmp: setDistance_tmp },
        duration: { value: duration, setDuration: setDuration },
    };

    return <OSMContext.Provider value={value}>{children}</OSMContext.Provider>;
};

export const useOSM = () => {
    return useContext(OSMContext);
};

export default OSMProvider;
