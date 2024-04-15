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
import { STATUS_ACTIVE } from '../../constants/backend';
import { useUpdateOrderMutation } from '../../graphql-client/mutations/services';
import { useNavigation } from '@react-navigation/native';
import { HomeName } from '../../constants/screen_names';

export default function OrderConfirmation({ route }) {
    const { order, orderDetails, distance } = route?.params || {};
    const { order_details } = order;
    const delivery_fee = calculateDeliveryFee(distance);

    const { authState } = useAuth();
    const { address } = useMap();

    const updateOrderFunc = useUpdateOrderMutation();
    const navigation = useNavigation();

    const [name, setName] = useState(
        authState.authenticated ? authState.user.full_name : ''
    );
    const [phoneNumber, setPhoneNumber] = useState(
        authState.authenticated ? authState.user.phone_number : ''
    );

    async function handleOnPressConfirmOrder() {
        try {
            async function PressYesConfirm() {
                const updateOrderInput = {
                    id: order.id,
                    recipient: name,
                    phone_number: phoneNumber,
                    address: address.value,
                    distance: distance,
                    delivery_fee: delivery_fee,
                    discount: order.discount,
                    total_quantity: order.total_quantity,
                    total_price: order.total_price + delivery_fee,
                    status: STATUS_ACTIVE,
                };

                const res = await updateOrderFunc(updateOrderInput);

                ToastAndroid.showWithGravity(
                    'Đã đặt hàng - chúc bạn ngon miệng',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
                navigation.navigate(HomeName);
            }
            showConfirmBox(PressYesConfirm);
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
                        value={
                            authState.authenticated
                                ? authState.user.full_name
                                : ''
                        }
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập số điện thoại"
                        value={
                            authState.authenticated
                                ? authState.user.phone_number
                                : ''
                        }
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
                        {order_details &&
                            order_details.map((detail, index) => (
                                <ProductPaymentCard
                                    key={index}
                                    detail={detail}
                                />
                            ))}
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
                        distance
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
