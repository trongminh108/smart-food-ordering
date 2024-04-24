import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
    displayDuration,
    formatCurrency,
} from '../../modules/feature_functions';
import { AgentForUserName } from '../../constants/screen_names';
import { BACKEND_IMAGES } from '../../constants/backend';

import { useLazyQuery, useMutation } from '@apollo/client';

import { addOrderDetails } from '../../apollo-client/mutations/mutations';
import { useMap } from '../../contexts/map_context';
import { getAgentByID } from '../../apollo-client/queries/agents';
import { displayDistance } from '../../modules/feature_functions';

const ProductCard = ({ product, agent, navigation, distance, duration }) => {
    const imagePath = BACKEND_IMAGES + product.images[0];
    const { origins, destinations, distance: mapDistance } = useMap();

    function handlePressProductCard() {
        destinations.setDestinations({
            lat: agent.position[0],
            lng: agent.position[1],
        });
        navigation.navigate(AgentForUserName, {
            agent: agent,
            id_product: product.id,
            id_category: product.id_category,
            price: product.price,
        });
    }

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={handlePressProductCard}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imagePath }}
                    style={styles.imageProduct}
                />
            </View>
            <View style={styles.cardInfo}>
                <Text
                    style={styles.textName}
                    ellipsizeMode="clip"
                    numberOfLines={1}
                >
                    {product.name} - {agent.name}
                </Text>
                <Text style={styles.textPrice}>
                    {formatCurrency(product.price)} | {product.rating}{' '}
                    <Ionicons
                        name="star"
                        color={'tomato'}
                        style={styles.star}
                    />{' '}
                    |{' '}
                    <Text>
                        {distance == 0
                            ? 'Đang xác định'
                            : displayDistance(distance) + ' '}
                    </Text>
                    <Text>
                        {duration == 0
                            ? ' | Đang xác định'
                            : ' | ' + displayDuration(duration)}
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        height: 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageContainer: {
        width: 84,
        height: 84,
        overflow: 'hidden',
    },
    imageProduct: {
        width: '100%',
        height: '100%',
    },
    cardInfo: { flexDirection: 'column', gap: 4 },
    textName: {
        // width: 280,
        fontWeight: 'bold',
        fontSize: 16,
        // overflow: 'hidden',
    },
    textPrice: {},
    star: {
        marginBottom: 20,
    },
});
