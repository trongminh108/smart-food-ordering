import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { formatCurrency } from '../../modules/feature_functions';
import { AgentForUserName } from '../../constants/screen_names';

const ProductCard = ({ product, agent, navigation }) => {
    function handlePressProductCard() {
        navigation.navigate(AgentForUserName, {
            agent: agent,
            id_product: product.id,
            id_category: product.id_category,
        });
    }

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={handlePressProductCard}
        >
            <Image source={product.image} style={styles.imageProduct} />
            <View style={styles.cardInfo}>
                <Text style={styles.textName}>
                    {product.name} - {agent.name}
                </Text>
                <Text style={styles.textPrice}>
                    {formatCurrency(product.price)} | {product.rating}{' '}
                    <Ionicons
                        name="star"
                        color={'tomato'}
                        style={styles.star}
                    />
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
    imageProduct: {
        width: 84,
        height: 84,
        // resizeMode: 'stretch',
        // position: 'absolute',
    },
    cardInfo: { flexDirection: 'column', gap: 4 },
    textName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textPrice: {},
    star: {
        marginBottom: 20,
    },
});
