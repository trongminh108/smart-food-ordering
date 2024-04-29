'use client';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { getOrdersByAgentID } from '@/app/apollo-client/queries/orders';
import { pubNewOrder } from '@/app/apollo-client/subscriptions/orders';
import OrderCard from '@/app/components/order_card/order_card';
import {
    STATUS_ACTIVE,
    STATUS_ALL,
    STATUS_DRAFT,
    STATUS_FAILED,
    STATUS_PENDING,
    STATUS_SUCCESS,
} from '@/app/constants/backend';
import { useAuth } from '@/app/contexts/auth_context';
import { useQuery, useSubscription } from '@apollo/client';
import { useAgent } from '@/app/contexts/agent_context';
import FilterTypeOrder from '@/app/components/filter_type_order/filter_type_order';
import Loading from '@/app/components/loading/loading';

function OrderHistory() {
    const { orders: ordersContext } = useAgent();
    const [orders, setOrders] = useState(ordersContext.value);

    const [typeOrder, setTypeOrder] = useState(STATUS_ALL);

    function handleSortOrders(ordersPending: any) {
        ordersPending.sort((a: any, b: any) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;
            return 0;
        });
        return ordersPending;
    }

    function handleFilterOrders(orders: any) {
        const ordersPending = orders.filter((order: any) => {
            return (
                order.status !== STATUS_PENDING && order.status !== STATUS_DRAFT
            );
        });
        return handleSortOrders(ordersPending);
    }

    function handleOnChangeType(e: any) {
        const type = e.target.value;
        // let newOrders = [];
        // if (type === STATUS_ACTIVE)
        //     newOrders = ordersContext.value.filter(
        //         (order: any) => order.status === STATUS_ACTIVE
        //     );
        // else if (type === STATUS_SUCCESS)
        //     newOrders = ordersContext.value.filter(
        //         (order: any) => order.status === STATUS_SUCCESS
        //     );
        // else if (type === STATUS_FAILED)
        //     newOrders = ordersContext.value.filter(
        //         (order: any) => order.status === STATUS_FAILED
        //     );
        // else newOrders = ordersContext.value;
        // setOrders(handleSortOrders(newOrders));
        setTypeOrder(type);
    }

    useEffect(() => {
        if (ordersContext.value) {
            const ordersFiltered = handleFilterOrders(ordersContext.value);
            if (typeOrder != STATUS_ALL)
                setOrders(
                    ordersFiltered.filter(
                        (order: any) => order.status === typeOrder
                    )
                );
            else setOrders(ordersFiltered);
        }
    }, [ordersContext.value, typeOrder]);

    if (!orders) return <Loading message="Đang tải đơn mới" />;

    if (orders)
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center pt-5 gap-4 px-5"
                style={{ backgroundColor: '#ebecf0' }}
            >
                <Row className="w-100 justify-content-end">
                    <Col sm={3}>
                        <FilterTypeOrder onChange={handleOnChangeType} />
                    </Col>
                </Row>
                {orders.length !== 0 ? (
                    orders.map((order: any) => (
                        <Row key={order.id} style={{ width: '100%' }}>
                            <OrderCard order={order} />
                        </Row>
                    ))
                ) : (
                    <Loading
                        loading={false}
                        message="Hiện tại chưa có đơn hiển thị"
                    />
                )}
            </Container>
        );
}

export default OrderHistory;
