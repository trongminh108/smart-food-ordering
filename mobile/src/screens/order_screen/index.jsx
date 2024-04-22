import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../contexts/auth_context';
import UserInfoContainer from '../../containers/user_info_container';
import NotLogin from '../../components/not_login/not_login';
import { FONT_SIZE } from '../../constants/style';
import colors from '../../constants/colors';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { getOrdersByUserID } from '../../graphql-client/queries/queries';
import LoadingScreen from '../../components/loading_screen/loading_screen';
import OrderCard from '../../components/order_card/order_card';
import { useMap } from '../../contexts/map_context';
import { useNavigation } from '@react-navigation/native';
import {
    pubNewOrder,
    pubUserStatusOrder,
} from '../../graphql-client/subscriptions/orders';
import { getAgentByUserID } from '../../graphql-client/queries/agents';
import {
    STATUS_ACTIVE,
    STATUS_DRAFT,
    STATUS_FAILED,
    STATUS_PENDING,
    STATUS_SUCCESS,
} from '../../constants/backend';
import { useNotifications } from '../../contexts/notification_context';

const OrdersScreen = () => {
    const { authState } = useAuth();
    const { distance } = useMap();
    const { onSendNotification } = useNotifications();
    const [currentType, setCurrentType] = useState(0);
    const [orders, setOrders] = useState(null);

    const [useGetOrdersByUserID, { data: dataOrders }] =
        useLazyQuery(getOrdersByUserID);
    const [isLoading, setIsLoading] = useState(true);

    const typesOfReceipt = ['Đang đến', 'Lịch sử', 'Đang duyệt', 'Đơn nháp'];
    const statusOrders = [
        STATUS_ACTIVE,
        STATUS_SUCCESS,
        STATUS_PENDING,
        STATUS_DRAFT,
    ];

    useSubscription(pubUserStatusOrder, {
        onData: ({ data }) => {
            const status = data.data.pubUserStatusOrder.status;
            const title = data.data.pubUserStatusOrder.agent.name;
            switch (status) {
                case STATUS_ACTIVE:
                    onSendNotification(title, 'Đơn của bạn đã được duyệt');
                    break;
                case STATUS_FAILED:
                    onSendNotification(title, 'Đơn của bạn đã bị hủy');
                    break;
                case STATUS_SUCCESS:
                    onSendNotification(
                        title,
                        'Đơn của bạn đã được giao thành công'
                    );
                    break;
                default:
                    break;
            }
        },
        variables: {
            idUser: authState?.user.id,
        },
    });

    useEffect(() => {
        async function getOrdersData() {
            if (authState.authenticated && authState.user.id) {
                const { data } = await useGetOrdersByUserID({
                    variables: {
                        ordersByUserIdId: authState.user.id,
                    },
                });
                setIsLoading(false);
            }
        }
        getOrdersData();
    }, [authState.authenticated]);

    useEffect(() => {
        setOrders(dataOrders?.ordersByUserID || []);
    }, [dataOrders]);

    function handlePressTypeReceipt(index) {
        setCurrentType(index);
    }

    if (!authState.authenticated) return <NotLogin />;

    if (isLoading) return <LoadingScreen message={'Đang tải hóa đơn'} />;

    return (
        // <UserInfoContainer>
        <View style={styles.ordersScreen}>
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
            <View>
                <ScrollView>
                    <View style={styles.listProductsContainer}>
                        {orders.map((order) => {
                            if (statusOrders[currentType] === order.status) {
                                let dis = -1;
                                let dura = -1;
                                if (
                                    statusOrders[currentType] === STATUS_DRAFT
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
                                        distance={dis}
                                        duration={dura}
                                        status={statusOrders[currentType]}
                                    />
                                );
                            }
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
        // </UserInfoContainer>
    );
};

export default OrdersScreen;

const styles = StyleSheet.create({
    ordersScreen: {
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
});
