import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import {
    BACKEND_IMAGES,
    STATUS_ACTIVE,
    STATUS_FAILED,
    STATUS_SUCCESS,
} from '@/app/constants/backend';
import './order_card.scss';
import {
    calculateTimeFrom,
    displayDistance,
    formatCurrency,
} from '@/app/modules/feature_function';

import OrderDetailsCard from '@/app/components/order_details_modal/order_details_modal';
import { pubNewOrder } from '@/app/apollo-client/subscriptions/orders';
import { useSubscription } from '@apollo/client';
import { useUpdateOrderMutation } from '@/app/apollo-client/mutations/services';
import colors from '@/app/constants/colors';

function OrderCard({ order }: { order: any }) {
    const defaultAvatar = require('@/app/favicon.ico');
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [modalShow, setModalShow] = useState(false);

    const updateOrderFunc = useUpdateOrderMutation();

    useEffect(() => {
        if (order?.user?.avatar)
            setAvatar(BACKEND_IMAGES + order?.user?.avatar);
    }, [order?.user?.avatar]);

    function handleClickOrderCard() {
        setModalShow(true);
    }

    async function handleClickConfirm() {
        setModalShow(false);
        const { id } = order;
        await updateOrderFunc({ id: id, status: STATUS_ACTIVE });
        alert('Bạn đã xác nhận hóa đơn');
    }

    async function handleClickCancel() {
        setModalShow(false);
        const { id } = order;
        await updateOrderFunc({ id: id, status: STATUS_FAILED });
        alert('Bạn đã từ chối hóa đơn');
    }

    return (
        <>
            <Container
                fluid
                className="cardOrderContainer py-0 rounded-3 border border-dark"
                onClick={handleClickOrderCard}
                style={{
                    backgroundColor:
                        order.status === STATUS_FAILED
                            ? colors.status_failed
                            : order.status === STATUS_ACTIVE
                            ? colors.status_active
                            : order.status === STATUS_SUCCESS
                            ? colors.status_success
                            : colors.white,
                }}
            >
                <Row className="p-0" style={{ height: 80 }}>
                    <Col sm={1} className="p-0">
                        <Image
                            src={avatar}
                            width={80}
                            height={80}
                            alt="user avatar"
                            style={{
                                backgroundColor: 'red',
                                width: '100%',
                                aspectRatio: '1',
                            }}
                        />
                    </Col>
                    <Col className="d-flex justify-content-between p-2 px-4">
                        <Col
                            style={{ fontSize: '20' }}
                            className="justify-content-between d-flex flex-column"
                        >
                            <Row style={{ fontWeight: 'bold', fontSize: '20' }}>
                                {`(${calculateTimeFrom(order.updatedAt)}) - ${
                                    order.recipient
                                } - ${order.phone_number}`}
                            </Row>
                            <Row>{`${displayDistance(
                                order.distance
                            )} - Địa chỉ: ${order.address}`}</Row>
                        </Col>
                        <Col
                            style={{ fontSize: '20', alignItems: 'flex-end' }}
                            className="justify-content-between d-flex flex-column"
                        >
                            <Row
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '20',
                                }}
                            >
                                {`${formatCurrency(order.total_price)} - (${
                                    order.total_quantity
                                } món)`}
                            </Row>
                            <Row
                                className="font-italic"
                                style={{ fontStyle: 'italic' }}
                            >{`Chi tiết >>`}</Row>
                        </Col>
                    </Col>
                </Row>
            </Container>
            <OrderDetailsCard
                show={modalShow}
                onHide={() => setModalShow(false)}
                onConfirm={handleClickConfirm}
                onCancel={handleClickCancel}
                order={order}
            />
        </>
    );
}

export default OrderCard;
