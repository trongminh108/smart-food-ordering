import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../contexts/auth_context';
import NotLogin from '../../components/not_login/not_login';
import { BUTTON_HEIGHT, FONT_SIZE } from '../../constants/style';
import colors from '../../constants/colors';
import LoadingScreen from '../../components/loading_screen/loading_screen';
import OrderCard from '../../components/order_card/order_card_4deliver';
import { useMap } from '../../contexts/map_context';
import { STATUS_ACTIVE } from '../../constants/backend';
import { useDeliver } from '../../contexts/deliver_context';
import { useNavigation } from '@react-navigation/native';
import {
    GGMapDirectionsName,
    OrderDetailsName,
} from '../../constants/screen_names';

const DeliverScreen = () => {
    const { authState } = useAuth();
    const { orders: ordersContext } = useDeliver();
    const { distance } = useMap();
    const [currentType, setCurrentType] = useState(0);
    const [orders, setOrders] = useState(null);
    const typesOfReceipt = ['Đơn hiện có', 'Đơn đã giao'];
    const statusOrders = ['ACTIVE', 'SUCCESS', 'no', 'PENDING'];
    const navigation = useNavigation();

    useEffect(() => {
        if (ordersContext.value) {
            setOrders(ordersContext.value);
        }
    }, [ordersContext.value, authState?.authenticated]);

    function handlePressTypeReceipt(index) {
        setCurrentType(index);
    }

    function handleOnPressOrderCard(order) {
        navigation.navigate(OrderDetailsName, {
            order: order,
        });
    }

    function handlePressMap() {
        navigation.navigate(GGMapDirectionsName);
    }

    if (!authState.authenticated) return <NotLogin />;

    if (!orders) return <LoadingScreen message={'Đang tải hóa đơn...'} />;

    return (
        <View style={styles.receiptScreen}>
            <View style={styles.headerReceipt}>
                <View style={styles.listCategoriesContainer}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={[
                            {
                                justifyContent: 'space-between',
                            },
                            typesOfReceipt === 3 && { width: '100%' },
                        ]}
                        showsHorizontalScrollIndicator={false}
                    >
                        {typesOfReceipt.map((receipt, index) => (
                            <TouchableHighlight
                                style={[
                                    styles.cateContainer,
                                    currentType === index &&
                                        styles.selectedCate,
                                ]}
                                key={index}
                                onPress={() => handlePressTypeReceipt(index)}
                                activeOpacity={1}
                                underlayColor={''}
                            >
                                <Text style={styles.cateText}>{receipt}</Text>
                            </TouchableHighlight>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginRight: 20,
                    marginTop: 12,
                }}
            >
                <TouchableHighlight
                    style={[styles.buttonLogout]}
                    onPress={handlePressMap}
                >
                    <Text style={{ color: colors.white }}>Map</Text>
                </TouchableHighlight>
            </View>
            <View>
                <ScrollView>
                    <View style={styles.listProductsContainer}>
                        {orders.map((order) => {
                            if (statusOrders[currentType] === order.status) {
                                let dis = -1;
                                let dura = -1;
                                if (
                                    statusOrders[currentType] === STATUS_ACTIVE
                                ) {
                                    if (distance.value.length != 0) {
                                        const tmp = distance.value.find(
                                            (ag) =>
                                                ag.id_agent === order.agent.id
                                        );
                                        dis = tmp.distance;
                                        dura = tmp.duration;
                                    }
                                }

                                return (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        distance={order.distance}
                                        duration={dura}
                                        status={statusOrders[currentType]}
                                        onPress={handleOnPressOrderCard}
                                    />
                                );
                            }
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default DeliverScreen;

const styles = StyleSheet.create({
    receiptScreen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerReceipt: {
        backgroundColor: colors.white,
    },
    cateContainer: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: colors.white,
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
        marginBottom: 44,
    },
    buttonLogout: {
        width: '40%',
        height: 40,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BUTTON_HEIGHT,
    },
});
