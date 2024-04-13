import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import { BUTTON_HEIGHT, FONT_SIZE } from '../../constants/style';
import { formatCurrency } from '../../modules/feature_functions';

export default function OrderConfirmation({ route }) {
    const { order, orderDetails } = route?.params || {};

    function handleOnPressConfirmOrder() {}

    return (
        <View style={styles.orderConfirmationContainer}>
            <Text>OrderConfirmation</Text>
            <TouchableHighlight
                style={styles.buttonConfirm}
                activeOpacity={1}
                underlayColor={colors.primary_hover}
                onPress={handleOnPressConfirmOrder}
            >
                <Text style={styles.textButtonConfirm}>
                    Thanh Toán - {formatCurrency(order.total_price)}
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
});
