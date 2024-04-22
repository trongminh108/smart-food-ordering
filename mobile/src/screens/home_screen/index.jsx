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
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [getProducts, { loading, error, data: dataProducts }] =
        useLazyQuery(getAllProducts);
    const [
        getAgents,
        { loading: loadingAgents, error: errorAgents, data: dataAgents },
    ] = useLazyQuery(getAllAgents);

    const { address, distance } = useMap();
    const [productsData, setProductsData] = useState([]);
    const [agentsData, setAgentsData] = useState([]);

    useEffect(() => {
        async function getData() {
            getProducts();
            getAgents();
        }
        getData();
    }, []);

    useEffect(() => {
        if (dataProducts?.products && dataAgents?.agents) {
            setIsLoading(false);
            setProductsData(dataProducts.products);
            setAgentsData(dataAgents.agents);
        }
    }, [dataAgents, dataProducts]);

    function searchIgnoreCaseAndDiacritics(text, keyword) {
        const normalizedText = text.toLowerCase();
        const normalizedKeyword = keyword.toLowerCase();

        const removeDiacritics = (str) => {
            return str
                .normalize('NFD') // Chuẩn hóa chuỗi thành Unicode (NFD)
                .replace(/[\u0300-\u036f]/g, ''); // Loại bỏ các ký tự dấu
        };

        const normalizedTextWithoutDiacritics =
            removeDiacritics(normalizedText);
        const normalizedKeywordWithoutDiacritics =
            removeDiacritics(normalizedKeyword);

        return normalizedTextWithoutDiacritics.includes(
            normalizedKeywordWithoutDiacritics
        );
    }

    function handleSubmitSearch(keyword) {
        if (keyword)
            setProductsData((prev) =>
                prev.filter((product) =>
                    searchIgnoreCaseAndDiacritics(product.name, keyword)
                )
            );
        else setProductsData(dataProducts.products);
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
            <SearchBar onSubmit={handleSubmitSearch} />
            {/* List Products */}
            <ScrollView>
                <View style={styles.listProductsContainer}>
                    {productsData.map((product) => {
                        const agent = agentsData.find(
                            (agent) => agent.id === product.id_agent
                        );
                        let dis = 0;
                        let dura = 0;
                        if (distance?.value?.length != 0) {
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
