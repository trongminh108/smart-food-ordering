import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
    calculateTimeFrom,
    convertDateTimeToUTC7,
    displayDuration,
    formatCurrency,
} from '../../modules/feature_functions';
import { OrderConfirmationName } from '../../constants/screen_names';
import {
    BACKEND_IMAGES,
    STATUS_ACTIVE,
    STATUS_DRAFT,
    STATUS_FAILED,
    STATUS_PENDING,
    STATUS_SUCCESS,
} from '../../constants/backend';
import { displayDistance } from '../../modules/feature_functions';
import { useNavigation } from '@react-navigation/native';
import { useUpdateOrderMutation } from '../../apollo-client/mutations/services';

const OrderCard = ({ order, distance, duration, status }) => {
    const { agent, user } = order;

    const imagePath = BACKEND_IMAGES + order.agent.images[0];

    const navigation = useNavigation();

    const useUpdateOrderFunc = useUpdateOrderMutation();

    async function handleConfirmSuccessOrder() {
        await useUpdateOrderFunc({ id: order.id, status: STATUS_SUCCESS });
        ToastAndroid.showWithGravity(
            'Xác nhận đơn này thành công',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }

    async function handleConfirmFailedOrder() {
        await useUpdateOrderFunc({ id: order.id, status: STATUS_FAILED });
        ToastAndroid.showWithGravity(
            'Xác nhận đơn này thất bại',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }

    function handlePressOrderCard() {
        if (status === STATUS_DRAFT)
            navigation.navigate(OrderConfirmationName, {
                order: order,
                distance: distance,
                duration: duration,
                is_draft: true,
            });
        else if (status === STATUS_ACTIVE) {
            Alert.alert(
                'Thông báo',
                'Xác nhận đơn hàng này?',
                [
                    {
                        text: 'Thất bại',
                        onPress: handleConfirmFailedOrder,
                        style: 'cancel',
                    },
                    {
                        text: 'Thành công',
                        onPress: handleConfirmSuccessOrder,
                    },
                ],
                { cancelable: true }
            );
        } else alert(status);
    }

    return (
        <TouchableHighlight
            style={styles.cardContainer}
            onPress={handlePressOrderCard}
            activeOpacity={0.5}
            underlayColor={'#bab6b6'}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: imagePath }}
                        style={styles.imageProduct}
                    />
                    <View>
                        <Text>Hello</Text>
                    </View>
                </View>
                <View style={styles.cardInfo}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 4,
                        }}
                    >
                        <Text
                            style={styles.textName}
                            ellipsizeMode="clip"
                            numberOfLines={1}
                        >
                            {agent.name}
                        </Text>
                        <Text>{`(${calculateTimeFrom(order.updatedAt)})`}</Text>
                    </View>
                    <Text style={styles.textPrice}>
                        {agent.rating}{' '}
                        <Ionicons
                            name="star"
                            color={'tomato'}
                            style={styles.star}
                        />{' '}
                        <Text>
                            {distance === 0
                                ? '| Đang xác định '
                                : distance === -1
                                ? ''
                                : '| ' + displayDistance(distance) + ' '}
                        </Text>
                        <Text>
                            {duration === 0
                                ? '| Đang xác định'
                                : duration === -1
                                ? ''
                                : '| ' + displayDuration(duration)}
                        </Text>
                    </Text>
                    <Text style={styles.textPrice}>
                        <Text>
                            {formatCurrency(order.total_price)}
                            {` (${order.total_quantity} món)`}
                        </Text>
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default OrderCard;

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
    imageContainer: {
        width: 84,
        height: 84,
        overflow: 'hidden',
    },
    imageProduct: {
        width: '100%',
        height: '100%',
    },
    cardInfo: { flexDirection: 'column', gap: 4, marginLeft: 8 },
    textName: {
        // width: 280,
        fontWeight: 'bold',
        fontSize: 16,
        // overflow: 'hidden',
    },
    textPrice: {},
    star: {
        marginBottom: 20,
    },
});
