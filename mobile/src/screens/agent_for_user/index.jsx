import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import colors from '../../constants/colors';
import { FONT_SIZE, MARGIN_SCROLLVIEW_BOTTOM } from '../../constants/style';
import {
    BACKEND_IMAGES,
    STATUS_DRAFT,
    STATUS_PENDING,
} from '../../constants/backend';

import ProductCardAgent from '../../components/product_card_agent/product_card_agent';
import OrderProducts from '../../components/order_products/order_products';
import LoadingScreen from '../../components/loading_screen/loading_screen';

import { useLazyQuery } from '@apollo/client';
import { getAllProducts } from '../../graphql-client/queries/products';
import { getAllCategories } from '../../graphql-client/queries/categories';
import {
    useAddOrderDetailsMutation,
    useAddOrderMutation,
    useUpdateOrderMutation,
} from '../../graphql-client/mutations/services';
import { useAuth } from '../../contexts/auth_context';
import { useMap } from '../../contexts/map_context';
import { getDistanceDuration } from '../../modules/feature_functions';
import { OrderConfirmationName } from '../../constants/screen_names';

const AgentForUser = ({ route }) => {
    const { agent, id_product, id_category, price } = route?.params || {};

    const [getProducts, { loading: loadingProducts, data: responseProducts }] =
        useLazyQuery(getAllProducts);
    const [
        getCategories,
        { loading: loadingCategories, data: responseCategories },
    ] = useLazyQuery(getAllCategories);

    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isBlur, setIsBlur] = useState(false);
    const { authState } = useAuth();
    const imagePath = BACKEND_IMAGES + agent.images[0];
    const { distance } = useMap();

    const productsData = responseProducts?.products || null;
    const categoriesData = responseCategories?.categories || null;

    const productsOfAgent = responseProducts?.products.filter(
        (pro) => pro.id_agent === agent.id
    );
    const categoriesOfAgent = responseCategories?.categories.filter((cate) =>
        productsOfAgent.some((pro) => pro.id_category === cate.id)
    );

    const [orderDetails, setOrderDetails] = useState([]);

    const [selectedCate, setSelectedCate] = useState(
        id_category || categoriesOfAgent[0].id
    );

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    useEffect(() => {
        if (productsData && categoriesData) {
            setIsLoading(false);
        }
    }, [productsData, categoriesData]);

    useEffect(() => {
        setSelectedCate(id_category);
    }, [id_category]);

    const navigation = useNavigation();
    const AddOrderDetailsFunc = useAddOrderDetailsMutation();
    const AddOrderFunc = useAddOrderMutation();
    const UpdateOrderFunc = useUpdateOrderMutation();

    let is_blur = true;

    async function handleSaveDraftOrder() {
        if (authState.authenticated && orderDetails.length != 0 && is_blur) {
            const quantity = orderDetails.reduce(
                (acc, detail) => acc + detail.quantity,
                0
            );

            const total = orderDetails.reduce(
                (acc, detail) => acc + detail.subtotal,
                0
            );

            const responseOrder = await AddOrderFunc({
                id_agent: agent.id,
                id_user: authState.user.id,
                total_quantity: quantity,
                total_price: total,
                status: STATUS_DRAFT,
            });
            const responseOrderDetails = await orderDetails.map(
                async (detail) => {
                    await AddOrderDetailsFunc({
                        id_order: responseOrder.id,
                        id_product: detail.id_product,
                        quantity: detail.quantity,
                        discount: 0,
                        subtotal: detail.subtotal,
                    });
                }
            );
            await UpdateOrderFunc({
                id: responseOrder.id,
                name: responseOrder.name,
            });

            ToastAndroid.showWithGravity(
                'Đã lưu vào đơn nháp',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        setOrderDetails([]);
        setIsBlur((prev) => !prev);
    }

    useEffect(() => {
        setOrderDetails([
            {
                id_product: id_product,
                quantity: 1,
                discount: 0,
                subtotal: price,
            },
        ]);
    }, [id_product, isBlur]);

    useEffect(() => {
        navigation.addListener('blur', handleSaveDraftOrder);

        return () => {
            navigation.removeListener('blur', handleSaveDraftOrder);
        };
    }, [navigation, orderDetails]);

    function handlePressFavorite() {
        setIsFavorite((prev) => !prev);
    }

    function handlePressCate(id_cate) {
        setSelectedCate(id_cate);
    }

    function handlePressOrderProducts() {
        is_blur = false;

        const quantity = orderDetails.reduce(
            (acc, detail) => acc + detail.quantity,
            0
        );

        const total = orderDetails.reduce(
            (acc, detail) => acc + detail.subtotal,
            0
        );

        const order = {
            id_agent: agent.id,
            id_user: authState?.user?.id || null,
            total_quantity: quantity,
            total_price: total,
            status: STATUS_DRAFT,
            order_details: [
                ...orderDetails.map((detail) => {
                    const product = productsOfAgent.find(
                        (product) => product.id === detail.id_product
                    );

                    return {
                        id_order: '',
                        id_product: detail.id_product,
                        product: product,
                        quantity: detail.quantity,
                        discount: 0,
                        subtotal: detail.subtotal,
                    };
                }),
            ],
        };
        const tmp = getDistanceDuration(distance, agent.id);
        const dis = tmp[0];
        const dur = tmp[1];

        navigation.navigate(OrderConfirmationName, {
            order: order,
            distance: dis,
            duration: dur,
            is_draft: false,
        });

        setOrderDetails([]);
        setIsBlur((prev) => !prev);
    }

    function handlePressAddProduct(product, quantity) {
        setOrderDetails((prev) => {
            const productIndex = prev.findIndex(
                (details) => details.id_product === product.id
            );
            //check isn't exist product
            if (productIndex === -1) {
                const res = [
                    ...prev,
                    {
                        id_product: product.id,
                        quantity: 1,
                        discount: 0,
                        subtotal: product.price,
                    },
                ];
                return res;
            } else
                return prev
                    .map((details, index) => {
                        if (index === productIndex) {
                            // Tăng số lượng lên 1
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

    if (isLoading) return <LoadingScreen />;

    return (
        <View style={styles.AgentForUserContainer}>
            <View style={styles.header}>
                <Image style={styles.imageBanner} source={{ uri: imagePath }} />
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
                        <Text>
                            {' -  (' + agent.comments_quantity + ' đánh giá)'}
                        </Text>
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
                <ScrollView horizontal={false}>
                    <View style={styles.listProductsContainer}>
                        {productsOfAgent.map((pro) => {
                            if (pro.id_category === selectedCate)
                                return (
                                    <ProductCardAgent
                                        key={pro.id}
                                        product={pro}
                                        onPressAddProduct={
                                            handlePressAddProduct
                                        }
                                        product_quantity={
                                            pro.id === id_product ? 1 : 0
                                        }
                                    />
                                );
                        })}
                    </View>
                </ScrollView>
            </View>
            {/* Order Product */}

            <OrderProducts
                orderDetails={orderDetails}
                onPress={handlePressOrderProducts}
            />
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
        marginBottom: MARGIN_SCROLLVIEW_BOTTOM,
    },
});
