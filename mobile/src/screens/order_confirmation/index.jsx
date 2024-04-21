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
    showConfirmBox,
} from '../../modules/feature_functions';

import { Ionicons } from '@expo/vector-icons';
import { useMap } from '../../contexts/map_context';
import { useAuth } from '../../contexts/auth_context';
import ProductPaymentCard from '../../components/product_payment_card/product_payment_card';
import { STATUS_ACTIVE, STATUS_PENDING } from '../../constants/backend';
import {
    useAddOrderDetailsMutation,
    useAddOrderMutation,
    useUpdateOrderMutation,
} from '../../graphql-client/mutations/services';
import { useNavigation } from '@react-navigation/native';
import { HomeName } from '../../constants/screen_names';

import { isValidPhoneNumber } from '../../modules/feature_functions';

export default function OrderConfirmation({ route }) {
    const { order, distance, is_draft, duration } = route?.params || {};
    const { order_details } = order;
    const delivery_fee = calculateDeliveryFee(distance);

    const navigation = useNavigation();
    const { authState } = useAuth();
    const { address, origins } = useMap();
    const updateOrderFunc = useUpdateOrderMutation();
    const AddOrderDetailsFunc = useAddOrderDetailsMutation();
    const AddOrderFunc = useAddOrderMutation();

    const [name, setName] = useState(
        authState.authenticated ? authState.user.full_name : ''
    );
    const [phoneNumber, setPhoneNumber] = useState(
        authState.authenticated ? authState.user.phone_number : ''
    );
    const [isLoading, setIsLoading] = useState(false);

    async function handleOnPressConfirmOrder() {
        try {
            setIsLoading(true);
            async function PressYesConfirm() {
                if (
                    isValidPhoneNumber(phoneNumber) &&
                    name.trim().length != 0
                ) {
                    if (is_draft) {
                        const updateOrderInput = {
                            id: order.id,
                            recipient: name,
                            phone_number: phoneNumber,
                            position: [origins.value.lat, origins.value.lng],
                            address: address.value,
                            distance: distance,
                            delivery_fee: delivery_fee,
                            discount: order.discount,
                            total_quantity: order.total_quantity,
                            total_price: order.total_price,
                            status: STATUS_PENDING,
                        };

                        const res = await updateOrderFunc(updateOrderInput);
                    } else {
                        const responseOrder = await AddOrderFunc({
                            id_agent: order.id_agent,
                            recipient: name,
                            phone_number: phoneNumber,
                            position: [origins.value.lat, origins.value.lng],
                            address: address.value,
                            distance: distance,
                            delivery_fee: delivery_fee,
                            id_user: authState?.user?.id || null,
                            total_quantity: order.total_quantity,
                            total_price: order.total_price,
                            status: STATUS_PENDING,
                        });
                        const res = await order_details.map(async (detail) => {
                            await AddOrderDetailsFunc({
                                id_order: responseOrder?.id,
                                id_product: detail.id_product,
                                quantity: detail.quantity,
                                discount: 0,
                                subtotal: detail.subtotal,
                            });
                        });
                    }
                    ToastAndroid.showWithGravity(
                        'Đã đặt hàng - chúc bạn ngon miệng',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                    );
                    navigation.navigate(HomeName);
                } else {
                    alert('Tên người nhận hoặc số điện thoại không hợp lệ');
                }
            }
            showConfirmBox(PressYesConfirm);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

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
                    {address.value}
                </Text>
            </View>

            <View style={styles.infoUserContainer}>
                <View style={styles.textInputContainer}>
                    <Text>Tên người nhận: </Text>
                    <Text>Số điện thoại: </Text>
                </View>
                <View style={[styles.textInputContainer, { flex: 1 }]}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập tên người nhận"
                        onChangeText={(e) => setName(e)}
                        value={name}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập số điện thoại"
                        value={phoneNumber}
                        onChangeText={(e) => setPhoneNumber(e)}
                    />
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
                        distance == -1 ? 0 : distance
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
                    Thanh Toán -{' '}
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
