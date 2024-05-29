import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../constants/colors';
import { BUTTON_HEIGHT, FONT_SIZE, ICON_SIZE_MID } from '../../constants/style';
import {
    calculateDeliveryFee,
    displayDistance,
    formatCurrency,
    showAlertBox,
    showConfirmBox,
} from '../../modules/feature_functions';

import { Ionicons } from '@expo/vector-icons';
import { useMap } from '../../contexts/map_context';
import { useAuth } from '../../contexts/auth_context';
import ProductPaymentCard from '../product_payment_card/product_payment_card';
import LoadingScreen from '../loading_screen/loading_screen';
import {
    STATUS_ACTIVE,
    STATUS_DRAFT,
    STATUS_FAILED,
    STATUS_PENDING,
    STATUS_SUCCESS,
} from '../../constants/backend';
import {
    useAddOrderDetailsMutation,
    useAddOrderMutation,
    useUpdateOrderMutation,
} from '../../apollo-client/mutations/services';
import { useNavigation } from '@react-navigation/native';
import { DeliverName, HomeName } from '../../constants/screen_names';

import { isValidPhoneNumber } from '../../modules/feature_functions';

export default function OrderDetails({ route }) {
    // const { order, distance, is_draft, duration } = route?.params || {};
    const { order } = route?.params || {};
    const { order_details } = order;
    const delivery_fee = calculateDeliveryFee(order.distance);

    const navigation = useNavigation();
    const { authState } = useAuth();
    const { address, origins } = useMap();
    const updateOrderFunc = useUpdateOrderMutation();
    const AddOrderDetailsFunc = useAddOrderDetailsMutation();
    const AddOrderFunc = useAddOrderMutation();

    const [isLoading, setIsLoading] = useState(false);

    async function handlePressOrderFailed() {
        try {
            setIsLoading(true);

            await updateOrderFunc({ id: order.id, status: STATUS_FAILED });

            ToastAndroid.showWithGravity(
                'Đã xác nhận hóa đơn thất bại',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            navigation.navigate(DeliverName);
            setIsLoading(false);
        } catch (error) {
            console.error('[ORDER FAILED]', error);
        }
    }

    async function handlePressOrderSuccess() {
        try {
            setIsLoading(true);

            await updateOrderFunc({ id: order.id, status: STATUS_SUCCESS });

            ToastAndroid.showWithGravity(
                'Đã xác nhận hóa đơn thành công',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
            navigation.navigate(DeliverName);
            setIsLoading(false);
        } catch (error) {
            console.error('[ORDER SUCCESS]', error);
        }
    }

    async function handleOnPressConfirmOrder() {
        try {
            showAlertBox(
                'Thông báo',
                'Xác nhận hóa đơn thành công hay thất bại?',
                handlePressOrderSuccess,
                handlePressOrderFailed,
                'Thành công',
                'Thất bại'
            );
        } catch (error) {
            console.error(error);
        }
    }

    if (isLoading)
        return (
            <LoadingScreen message={'Đang xác nhận tình trạng đơn hàng...'} />
        );

    return (
        <View style={styles.orderConfirmationContainer}>
            <View style={styles.header}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: colors.white,
                    }}
                >
                    Xác nhận đơn hàng
                </Text>
            </View>

            <View style={styles.addressContainer}>
                <Ionicons name="location" size={ICON_SIZE_MID} color={'red'} />
                <Text numberOfLines={1} ellipsizeMode="tail">
                    {order.address}
                </Text>
            </View>

            <View style={styles.infoUserContainer}>
                <View style={styles.textInputContainer}>
                    <Text>{`Tên người nhận: ${order.recipient}`}</Text>
                    <Text>{`Số điện thoại: ${order.phone_number}`}</Text>
                </View>
            </View>

            {/* List Product Payment Card */}
            <View>
                <ScrollView>
                    <View
                        style={{ gap: 8, marginTop: 12, paddingHorizontal: 16 }}
                    >
                        {order_details ? (
                            order_details.map((detail, index) => (
                                <ProductPaymentCard
                                    key={index}
                                    detail={detail}
                                />
                            ))
                        ) : (
                            <Text>Hê lô</Text>
                        )}
                    </View>
                </ScrollView>
            </View>

            {/* Payment Info */}
            <View style={styles.paymentInfoContainer}>
                <View style={styles.feeContainer}>
                    <Text>{`Tổng cộng (${order.total_quantity} món)`}</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        {formatCurrency(order.total_price)}
                    </Text>
                </View>
                <View style={styles.feeContainer}>
                    <Text>{`Phí giao hàng (${displayDistance(
                        order.distance == -1 ? 0 : order.distance
                    )})`}</Text>
                    <Text style={{ fontWeight: 'bold' }}>
                        {formatCurrency(delivery_fee)}
                    </Text>
                </View>
            </View>

            <TouchableHighlight
                style={styles.buttonConfirm}
                activeOpacity={1}
                underlayColor={colors.primary_hover}
                onPress={handleOnPressConfirmOrder}
            >
                <Text style={styles.textButtonConfirm}>
                    Xác nhận hóa đơn -{' '}
                    {formatCurrency(order.total_price + delivery_fee)}
                </Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    orderConfirmationContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: colors.background,
    },
    buttonConfirm: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
        height: BUTTON_HEIGHT,
    },
    textButtonConfirm: {
        fontSize: FONT_SIZE,
        color: colors.white,
    },
    header: {
        width: '100%',
        height: 44,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoUserContainer: {
        paddingVertical: 8,
        paddingHorizontal: 32,
        gap: 8,
        backgroundColor: colors.white,
        flexDirection: 'row',
    },
    textInputContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 16,
    },
    textInput: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    paymentInfoContainer: {
        backgroundColor: colors.white,
        position: 'absolute',
        bottom: 68,
        width: '100%',
        gap: 16,
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    feeContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});
