import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { formatCurrency } from '../../modules/feature_functions';
import colors from '../../constants/colors';
import { FONT_SIZE, ICON_SIZE_BIG } from '../../constants/style';
import { BACKEND_IMAGES } from '../../constants/backend';

export default function ProductCardAgent({
    product,
    onPressAddProduct,
    product_quantity,
}) {
    const [quantity, setQuantity] = useState(product_quantity);
    const [idProduct, setIdProduct] = useState(product.id);
    const imagePath = BACKEND_IMAGES + product.images[0];

    useEffect(() => {
        setQuantity(product_quantity);
    }, [product_quantity]);

    function handlePressProductCard() {
        alert(`Info of ${product.name}`);
    }

    function handleAddProduct(id_product) {
        setQuantity((prev) => prev + 1);
        onPressAddProduct(product, 1);
    }

    function handleRemoveProduct(id_product) {
        setQuantity((prev) => prev - 1);
        onPressAddProduct(product, -1);
    }

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={handlePressProductCard}
            activeOpacity={1}
        >
            <Image source={{ uri: imagePath }} style={styles.imageProduct} />
            <View style={styles.cardInfo}>
                <Text style={styles.textName}>{product.name}</Text>
                <View>
                    <Text>
                        {'Đã bán ' + product.sold + ' | ' + product.rating}
                        <Ionicons
                            name="star"
                            color={'tomato'}
                            style={styles.star}
                            size={12}
                        />
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.textPrice}>
                        {formatCurrency(product.price)}
                    </Text>
                    <View style={styles.addRemoveContainer}>
                        {quantity != 0 && (
                            <>
                                <Ionicons
                                    name="remove-circle"
                                    color={colors.primary}
                                    size={ICON_SIZE_BIG}
                                    onPress={() =>
                                        handleRemoveProduct(product.id)
                                    }
                                />
                                <Text>{quantity}</Text>
                            </>
                        )}

                        <Ionicons
                            name="add-circle"
                            color={colors.primary}
                            size={ICON_SIZE_BIG}
                            onPress={() => handleAddProduct(product.id)}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '95%',
        height: 'auto',
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        gap: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageProduct: {
        width: '25%',
        aspectRatio: 1,
        // resizeMode: 'stretch',
        // position: 'absolute',
    },
    cardInfo: { flexDirection: 'column', gap: 4, width: '70%' },
    textName: {
        fontWeight: 'bold',
        fontSize: FONT_SIZE,
    },
    textPrice: { fontWeight: 'bold' },
    star: {
        marginBottom: 20,
    },
    addRemoveContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
});
