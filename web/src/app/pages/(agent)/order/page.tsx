'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import { getOrdersByAgentID } from '@/app/apollo-client/queries/orders';
import { pubNewOrder } from '@/app/apollo-client/subscriptions/orders';
import OrderCard from '@/app/components/order_card/order_card';
import { STATUS_ACTIVE, STATUS_PENDING } from '@/app/constants/backend';
import { useAuth } from '@/app/contexts/auth_context';
import { useQuery, useSubscription } from '@apollo/client';
import { useAgent } from '@/app/contexts/agent_context';

function OrderManage() {
    const { authState } = useAuth();
    const { orders: ordersContext } = useAgent();
    const [orders, setOrders] = useState(ordersContext.value);

    function handleFilterOrders(orders: any, status: any) {
        const ordersPending = orders.filter((order: any) => {
            return order.status === status;
        });
        ordersPending.sort((a: any, b: any) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;
            return 0;
        });
        return ordersPending;
    }

    useEffect(() => {
        if (ordersContext.value)
            setOrders(handleFilterOrders(ordersContext.value, STATUS_PENDING));
    }, [ordersContext.value]);

    if (!orders)
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
