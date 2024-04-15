import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { formatCurrency } from '../../modules/feature_functions';
import { BACKEND_IMAGES } from '../../constants/backend';
import colors from '../../constants/colors';

const ProductPaymentCard = ({ detail }) => {
    const { product } = detail;
    const imagePath = BACKEND_IMAGES + product.images[0];

    return (
        <View style={styles.productCardPaymentContainer}>
            <Image source={{ uri: imagePath }} style={styles.imageProduct} />
            <View style={styles.productInfo}>
                <Text>{`${detail.quantity} x ${product.name}`}</Text>
                <Text style={{ fontWeight: 'bold' }}>{`${formatCurrency(
                    detail.subtotal
                )}`}</Text>
            </View>
        </View>
    );
};

export default ProductPaymentCard;

const styles = StyleSheet.create({
    productCardPaymentContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageProduct: {
        width: '20%',
        aspectRatio: 1,
    },
    productInfo: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
});
