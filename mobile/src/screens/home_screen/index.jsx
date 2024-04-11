import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

import SearchBar from '../../components/search_bar/search_bar';
import ProductCard from '../../components/product_card/product_card';
import UserLocation from '../../components/user_location/user_location';

import { AGENTS, PRODUCTS } from '../../constants/data';
import { AgentForUserName } from '../../constants/screen_names';
import { getAllUsers } from '../../graphql-client/queries/users';
import { useLazyQuery } from '@apollo/client';

export default function HomeScreen({ navigation }) {
    const [getUsers, { loading, error, data }] = useLazyQuery(getAllUsers);

    if (loading) console.log('loading...');
    if (error) console.log(error);

    function handleGetUser() {
        getUsers();
        if (data) console.log(data.users[0].username);
    }

    return (
        <View>
            <SearchBar />
            {/* List Products */}
            <View style={styles.listProductsContainer}>
                {PRODUCTS.map((product) => {
                    const agent = AGENTS.find(
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
            {/* <UserLocation /> */}
            <TouchableOpacity onPress={handleGetUser}>
                <Text>GetUser</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    listProductsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
    },
});
