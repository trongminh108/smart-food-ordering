import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { FONT_SIZE } from '../../constants/style';

import { CATEGORIES, PRODUCTS } from '../../constants/data';
import ProductCardAgent from '../../components/product_card_agent/product_card_agent';
import OrderProducts from '../../components/order_products/order_products';

const AgentForUser = ({ route }) => {
    const { agent, id_product, id_category } = route?.params || {};

    const [isFavorite, setIsFavorite] = useState(false);

    const productsOfAgent = PRODUCTS.filter((pro) => pro.id_agent === agent.id);
    const categoriesOfAgent = CATEGORIES.filter((cate) =>
        productsOfAgent.some((pro) => pro.id_category === cate.id)
    );

    const [orderDetails, setOrderDetails] = useState([
        {
            id: '1',
            id_order: '1',
            id_product: id_product,
            quantity: 1,
            discount: 0,
            subtotal: productsOfAgent.find((pro) => pro.id === id_product)
                .price,
        },
    ]);
    const [selectedCate, setSelectedCate] = useState(
        id_category || categoriesOfAgent[0].id
    );

    // useEffect(() => {
    //     if (id_category) setSelectedCate(id_category);
    // }, id_category);

    const images = [
        require('../../../assets/images/limbo_agents/limbo1.jpg'),
        require('../../../assets/images/limbo_agents/limbo2.jpg'),
        require('../../../assets/images/limbo_agents/limbo3.jpg'),
    ];

    function handlePressFavorite() {
        setIsFavorite((prev) => !prev);
        // console.log(orderDetails);
    }

    function handlePressCate(id_cate) {
        setSelectedCate(id_cate);
    }

    function handlePressAddProduct(product, quantity) {
        setOrderDetails((prev) => {
            const productIndex = prev.findIndex(
                (details) => details.id_product === product.id
            );
            //check isn't exist product
            if (productIndex === -1)
                return [
                    ...prev,
                    {
                        id: '1',
                        id_order: '1',
                        id_product: product.id,
                        quantity: 1,
                        discount: 0,
                        subtotal: product.price,
                    },
                ];
            else
                return prev
                    .map((details, index) => {
                        if (index === productIndex) {
                            // Tăng số lượng lên 1 (hoặc bất kỳ giá trị nào bạn muốn)
                            if (quantity === 1)
                                return {
                                    ...details,
                                    quantity: details.quantity + quantity,
                                    // Cập nhật lại subtotal nếu cần thiết
                                    subtotal: details.subtotal + product.price,
                                };
                            else if (quantity + details.quantity !== 0)
                                return {
                                    ...details,
                                    quantity: details.quantity + quantity,
                                    // Cập nhật lại subtotal nếu cần thiết
                                    subtotal: details.subtotal - product.price,
                                };
                            else return null;
                        }
                        return details;
                    })
                    .filter((details) => details !== null);
        });
    }

    return (
        <View style={styles.AgentForUserContainer}>
            <View style={styles.header}>
                <Image style={styles.imageBanner} source={images[0]} />
            </View>
            <View style={styles.body}>
                <Text style={styles.textName}>{agent.name}</Text>

                {/* Info Agent */}
                <View style={styles.ratingContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text>{agent.rating + ' '}</Text>
                        <Ionicons name="star" color={'tomato'} size={14} />
                        <Text>{' -  (' + agent.comments + ' đánh giá)'}</Text>
                    </View>

                    <Ionicons
                        name="heart-circle-outline"
                        size={30}
                        color={isFavorite ? 'red' : 'black'}
                        onPress={handlePressFavorite}
                    />
                </View>

                {/* List Categories */}
                <View style={styles.listCategoriesContainer}>
                    <ScrollView horizontal>
                        {categoriesOfAgent.map((cate, index) => (
                            <TouchableHighlight
                                style={[
                                    styles.cateContainer,
                                    selectedCate === cate.id &&
                                        styles.selectedCate,
                                ]}
                                key={cate.id}
                                onPress={() => handlePressCate(cate.id)}
                                activeOpacity={1}
                                underlayColor={''}
                            >
                                <Text style={styles.cateText}>{cate.name}</Text>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </View>

                {/* List Products */}
                <View style={styles.listProductsContainer}>
                    {productsOfAgent.map((pro) => {
                        if (pro.id_category === selectedCate)
                            return (
                                <ProductCardAgent
                                    key={pro.id}
                                    product={pro}
                                    onPressAddProduct={handlePressAddProduct}
                                    product_quantity={() => {
                                        const indx = orderDetails.findIndex(
                                            (details) =>
                                                details.id_product === pro.id
                                        );
                                        if (indx !== -1)
                                            return orderDetails[indx].quantity;
                                        else return 0;
                                    }}
                                />
                            );
                    })}
                </View>
            </View>
            {/* Order Product */}
            <OrderProducts orderDetails={orderDetails} />
        </View>
    );
};

export default AgentForUser;

const styles = StyleSheet.create({
    AgentForUserContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        height: '30%',
    },
    imageBanner: {
        width: '100%',
        height: '100%',
    },
    body: {
        marginTop: 12,
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12,
    },
    listCategoriesContainer: {
        marginTop: 8,
        backgroundColor: 'white',
    },
    cateContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    selectedCate: {
        borderBottomWidth: 2,
        borderColor: colors.primary,
    },
    cateText: {
        fontSize: FONT_SIZE,
    },
    listProductsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
    },
});
