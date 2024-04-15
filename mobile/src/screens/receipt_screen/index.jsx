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
import { useLazyQuery } from '@apollo/client';
import { getOrdersByUserID } from '../../graphql-client/queries/queries';
import LoadingScreen from '../../components/loading_screen/loading_screen';
import ReceiptCard from '../../components/receipt_card/receipt_card';
import { useMap } from '../../contexts/map_context';

const ReceiptScreen = () => {
    const { authState } = useAuth();
    const { distance } = useMap();

    const typesOfReceipt = ['Đang đến', 'Lịch sử', 'Đánh giá', 'Đơn nháp'];
    const statusOrders = ['ACTIVE', 'SUCCESS', 'no', 'PENDING'];

    if (authState.user.is_agent) {
        typesOfReceipt.unshift('Đơn mới');
        statusOrders.unshift('NEW_RECEIPT');
    }

    const [currentType, setCurrentType] = useState(0);
    const [orders, setOrders] = useState(null);

    const [useGetOrdersByUserID, { data: dataOrders }] =
        useLazyQuery(getOrdersByUserID);

    useEffect(() => {
        if (authState.authenticated && authState.user.id) {
            useGetOrdersByUserID({
                variables: {
                    ordersByUserIdId: authState.user.id,
                },
            });
        }
    }, [authState.user.id]);

    useEffect(() => {
        if (dataOrders) {
            setOrders(dataOrders.ordersByUserID);
        }
    }, [dataOrders]);

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
                                if (statusOrders[currentType] === 'PENDING') {
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
                                    <ReceiptCard
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

export default ReceiptScreen;

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
