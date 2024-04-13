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
import { getAllAgents } from '../../graphql-client/queries/agents';

export default function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [getProducts, { loading, error, data }] =
        useLazyQuery(getAllProducts);
    const [
        getAgents,
        { loading: loadingAgents, error: errorAgents, data: dataAgents },
    ] = useLazyQuery(getAllAgents);

    if (loading) console.log('loading...');
    if (error) console.log(error);
    // if (data) console.log(data.products);
    const productsData = data?.products || null;
    const agentsData = dataAgents?.agents || null;

    useEffect(() => {
        getProducts();
        getAgents();
    }, []);

    useEffect(() => {
        if (productsData && agentsData) setIsLoading(false);
    }, [productsData, agentsData]);

    if (isLoading)
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );

    return (
        <View>
            <SearchBar />
            {/* List Products */}
            <ScrollView>
                <View style={styles.listProductsContainer}>
                    {productsData.map((product) => {
                        const agent = agentsData.find(
                            (agent) => agent.id === product.id_agent
                        );
                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                                agent={agent}
                                navigation={navigation}
                            />
                        );
                    })}
                </View>
            </ScrollView>
            {/* <UserLocation /> */}
        </View>
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
});
