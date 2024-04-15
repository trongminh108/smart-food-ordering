import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import SearchBar from '../../components/search_bar/search_bar';
import ProductCard from '../../components/product_card/product_card';
import UserLocation from '../../components/user_location/user_location';

import { AGENTS, PRODUCTS } from '../../constants/data';
import { useLazyQuery } from '@apollo/client';
import { getAllProducts } from '../../graphql-client/queries/products';
import {
    getAgentByID,
    getAllAgents,
} from '../../graphql-client/queries/agents';
import LoadingScreen from '../../components/loading_screen/loading_screen';
import { getUserLocation } from '../../modules/feature_functions';
import { useMap } from '../../contexts/map_context';
import { Ionicons } from '@expo/vector-icons';
import { ICON_SIZE_MID } from '../../constants/style';
import UserInfoContainer from '../../containers/user_info_container';

export default function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [getProducts, { loading, error, data }] =
        useLazyQuery(getAllProducts);
    const [
        getAgents,
        { loading: loadingAgents, error: errorAgents, data: dataAgents },
    ] = useLazyQuery(getAllAgents);

    const { origins, address, distance, distance_tmp } = useMap();

    if (loading) console.log('loading...');
    if (error) console.log(error);

    const productsData = data?.products || null;
    const agentsData = dataAgents?.agents || null;

    useEffect(() => {
        getProducts();
        getAgents();
        async function GetUserLocation() {
            const latlng = await getUserLocation();
            origins.setOrigins(latlng);
        }
        GetUserLocation();
    }, []);

    useEffect(() => {
        if (productsData && agentsData) {
            setIsLoading(false);
            getDistanceAllAgents(dataAgents.agents);
        }
    }, [productsData, agentsData]);

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
        distance_tmp.setDistance_tmp(data);
    }

    if (isLoading) return <LoadingScreen />;

    return (
        // <UserInfoContainer>
        <View>
            <View style={styles.addressContainer}>
                <Ionicons name="location" size={ICON_SIZE_MID} color={'red'} />
                <Text numberOfLines={1} ellipsizeMode="tail">
                    {address.value}
                </Text>
            </View>
            <SearchBar />
            {/* List Products */}
            <ScrollView>
                <View style={styles.listProductsContainer}>
                    {productsData.map((product) => {
                        const agent = agentsData.find(
                            (agent) => agent.id === product.id_agent
                        );
                        let dis = 0;
                        let dura = 0;
                        if (distance.value.length != 0) {
                            const tmp = distance.value.find(
                                (ag) => ag.id_agent === agent.id
                            );
                            dis = tmp.distance;
                            dura = tmp.duration;
                        }
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                agent={agent}
                                navigation={navigation}
                                distance={dis}
                                duration={dura}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            {/* <UserLocation /> */}
        </View>
        // </UserInfoContainer>
    );
}

const styles = StyleSheet.create({
    listProductsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
        marginBottom: 44,
    },

    addressContainer: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
