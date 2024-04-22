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
import { FONT_SIZE } from '../../constants/style';
import colors from '../../constants/colors';
import { useLazyQuery, useSubscription } from '@apollo/client';
import LoadingScreen from '../../components/loading_screen/loading_screen';
import OrderCard from '../../components/order_card/order_card';
import { useMap } from '../../contexts/map_context';
import { STATUS_ACTIVE } from '../../constants/backend';
import { getOrdersByCondition } from '../../graphql-client/queries/orders';
import { handleSortOrders } from '../../modules/feature_functions';

const DeliverScreen = () => {
    const { authState } = useAuth();
    const { distance } = useMap();
    const [currentType, setCurrentType] = useState(0);
    const [orders, setOrders] = useState([]);
    const typesOfReceipt = ['Đơn hiện có', 'Đơn đã giao'];
    const statusOrders = ['ACTIVE', 'SUCCESS', 'no', 'PENDING'];
    const [useGetOrdersByCondition] = useLazyQuery(getOrdersByCondition);

    // useSubscription(pubNewOrder, {
    //     onData: ({ data }) => {
    //         setOrders((prev) => [data.data.pubNewOrder, ...prev]);
    //     },
    //     variables: {
    //         idAgent: authState?.id_agent,
    //     },
    // });

    // console.log(authState?.id_agent);

    useEffect(() => {
        async function getOrdersData() {
            if (authState.authenticated && authState.user.is_deliver) {
                const { data } = await useGetOrdersByCondition({
                    variables: {
                        condition: {
                            id_agent: '661885da903a56f42717e862',
                        },
                    },
                });
                const orders = [...data.ordersByCondition];
                setOrders(handleSortOrders(orders));
            }
        }
        getOrdersData();
    }, [authState.authenticated]);

    function handlePressTypeReceipt(index) {
        setCurrentType(index);
    }

    if (!authState.authenticated) return <NotLogin />;

    if (!orders) return <LoadingScreen message={'Đang tải hóa đơn'} />;

    return (
        // <UserInfoContainer>
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
});
