'use client';

import { getOrdersByAgentID } from '@/app/apollo-client/queries/orders';
import OrderCard from '@/app/components/order_card/order_card';
import { STATUS_ACTIVE, STATUS_PENDING } from '@/app/constants/backend';
import { useAuth } from '@/app/contexts/auth_context';
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

function OrderManage() {
    const { authState } = useAuth();
    const {
        loading: loadingOrders,
        data: dataOrders,
        error,
    } = useQuery(getOrdersByAgentID, {
        variables: {
            ordersByAgentIdId: authState.user.agent.id,
        },
    });

    const [orders, setOrders] = useState<any>(null);

    useEffect(() => {
        if (dataOrders) {
            setOrders(
                dataOrders.ordersByAgentID.filter((order: any) => {
                    return order.status === STATUS_PENDING;
                })
            );
        }
    }, [dataOrders]);

    if (loadingOrders)
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center pt-3">
                <div>Đang tải đơn mới</div>
            </Container>
        );

    if (orders && orders.length != 0)
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center pt-5 gap-4 px-5"
                style={{ backgroundColor: '#ebecf0' }}
            >
                {orders.map((order: any) => {
                    return (
                        <Row key={order.id} style={{ width: '100%' }}>
                            <OrderCard order={order} />
                        </Row>
                    );
                })}
            </Container>
        );

    if (orders && orders.length == 0)
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center pt-3">
                <div>Không có đơn để hiển thị</div>
            </Container>
        );
}

export default OrderManage;
