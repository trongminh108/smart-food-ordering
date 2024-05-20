'use client';

import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { getOrdersByAgentID } from '@/app/apollo-client/queries/orders';
import { pubNewOrder } from '@/app/apollo-client/subscriptions/orders';
import OrderCard from '@/app/components/order_card/order_card';
import { STATUS_ACTIVE, STATUS_PENDING } from '@/app/constants/backend';
import { useAuth } from '@/app/contexts/auth_context';
import { useQuery, useSubscription } from '@apollo/client';
import { useAgent } from '@/app/contexts/agent_context';
import colors from '@/app/constants/colors';
import Loading from '@/app/components/loading/loading';
import MapOrdersModal from '@/app/components/map_orders_modal/map_orders_modal';

function OrderManage() {
    const { authState } = useAuth();
    const { orders: ordersContext } = useAgent();
    const [orders, setOrders] = useState(ordersContext.value);
    const [showMapModal, setShowMapModal] = useState(false);

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

    function handleOnClickShowMap() {
        setShowMapModal(true);
    }

    useEffect(() => {
        if (ordersContext.value)
            setOrders(handleFilterOrders(ordersContext.value, STATUS_PENDING));
    }, [ordersContext.value]);

    if (!orders) return <Loading loading={true} message="Đang tải đơn mới" />;

    if (orders && orders.length != 0)
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center pt-5 gap-4 px-5"
                style={{ backgroundColor: colors.background }}
            >
                <Row className="d-flex justify-content-end w-100">
                    <Col xs={2} className="p-0" style={{ marginRight: '24px' }}>
                        <Button
                            className="w-100"
                            variant="success"
                            onClick={handleOnClickShowMap}
                        >
                            Show map
                        </Button>
                    </Col>
                </Row>
                <Row className="w-100 gap-4">
                    {orders.map((order: any) => {
                        return (
                            <Row key={order.id} style={{ width: '100%' }}>
                                <OrderCard order={order} />
                            </Row>
                        );
                    })}
                </Row>
                <Row>
                    <MapOrdersModal
                        show={showMapModal}
                        onHide={() => setShowMapModal(false)}
                        orders={orders}
                    />
                </Row>
            </Container>
        );

    return <Loading loading={false} message="Tạm thời chưa có đơn mới" />;
}

export default OrderManage;
