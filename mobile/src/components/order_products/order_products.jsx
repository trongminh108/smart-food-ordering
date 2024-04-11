import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { formatCurrency } from '../../modules/feature_functions';

import colors from '../../constants/colors';
import { ICON_SIZE_BIG, PADDING_Y } from '../../constants/style';
import { OrderConfirmationName } from '../../constants/screen_names';

const OrderProducts = ({ orderDetails }) => {
    const [order, setOrder] = useState({
        id: '1',
        id_agent: '1',
        id_deliver: '1',
        id_user: '1',
        total_quantity: 0,
        total_price: 0,
        address: [],
        distance: 11.4,
        delivery_fee: 0,
        discount: 0,
        //pending, active, success, failed
        status: 'pending',
    });

    const navigation = useNavigation();

    useEffect(() => {
        setOrder((prev) => ({
            ...prev,
            total_quantity: orderDetails.reduce(
                (total, details) => total + details.quantity,
                0
            ),
            total_price: orderDetails.reduce(
                (total, details) => total + details.subtotal,
                0
            ),
        }));
    }, [orderDetails]);

    function handlePressOrderButton() {
        navigation.navigate(OrderConfirmationName, {
            order: order,
            orderDetails: orderDetails,
        });
    }

    return (
        <>
            {order.total_quantity !== 0 && (
                <View style={styles.orderProductsContainer}>
                    <View style={styles.orderInfo}>
                        <View style={styles.orderIcon}>
                            <Ionicons
                                name="basket"
                                color={colors.primary}
                                size={ICON_SIZE_BIG}
                            />
                            <View style={styles.orderQuantity}>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: colors.primary_hover,
                                    }}
                                >
                                    {order.total_quantity}
                                </Text>
                            </View>
                        </View>
                        <Text>{formatCurrency(order.total_price)}</Text>
                    </View>
                    <TouchableHighlight
                        style={styles.orderButton}
                        activeOpacity={1}
                        underlayColor={colors.primary_hover}
                        onPress={() => handlePressOrderButton()}
                    >
                        <Text style={{ color: colors.white }}>Đặt hàng</Text>
                    </TouchableHighlight>
                </View>
            )}
        </>
    );
};

export default OrderProducts;

const styles = StyleSheet.create({
    orderProductsContainer: {
        width: '100%',
        height: 52,
        backgroundColor: colors.white,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    orderInfo: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: PADDING_Y,
    },
    orderIcon: {
        // marginTop: 12,
    },
    orderQuantity: {
        width: 20,
        aspectRatio: 1,
        borderRadius: 20,
        backgroundColor: colors.white,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: '-20%',
        borderWidth: 1,
    },
    orderButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        backgroundColor: colors.primary,
    },
});
