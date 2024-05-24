import React, { useEffect, useState } from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import {
    BACKEND_IMAGES,
    STATUS_ACTIVE,
    STATUS_FAILED,
    STATUS_PENDING,
    STATUS_SUCCESS,
} from '@/app/constants/backend';
import './order_card.scss';
import {
    CustomToastify,
    calculateTimeFrom,
    displayDistance,
    formatCurrency,
} from '@/app/modules/feature_functions';

import OrderDetailsCard from '@/app/components/order_details_modal/order_details_modal';
import { pubNewOrder } from '@/app/apollo-client/subscriptions/orders';
import { useSubscription } from '@apollo/client';
import {
    useUpdateOrderMutation,
    useUpdateProductMutation,
} from '@/app/apollo-client/mutations/services';
import colors from '@/app/constants/colors';
import { useAgent } from '@/app/contexts/agent_context';
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from '@/app/constants/name';
import YesNoModal from '../yes_no_modal/yes_no_modal';

function OrderCard({ order }: { order: any }) {
    const defaultAvatar = require('@/assets/images/unknown_user.jpg');
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [modalShow, setModalShow] = useState(false);
    const [badge, setBadge] = useState(
        order.status === STATUS_PENDING ? true : false
    );
    const [messageModal, setMessageModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const { orders: ordersContext } = useAgent();

    const updateOrderFunc = useUpdateOrderMutation();
    const updateProductFunc = useUpdateProductMutation();

    useEffect(() => {
        if (order?.user?.avatar)
            setAvatar(BACKEND_IMAGES + order?.user?.avatar);
    }, [order?.user?.avatar]);

    function handleClickOrderCard() {
        setModalShow(true);
        setBadge(false);
    }

    async function handleClickConfirmModal() {
        try {
            setModalShow(false);
            setConfirmModal(false);
            const { id } = order;
            const STATUS =
                order.status === STATUS_PENDING
                    ? STATUS_ACTIVE
                    : order.status === STATUS_ACTIVE
                    ? STATUS_SUCCESS
                    : '';
            if (STATUS) {
                const updatedOrder = await updateOrderFunc({
                    id: id,
                    status: STATUS,
                });
                if (STATUS === STATUS_SUCCESS) {
                    const orderDetails = updatedOrder.order_details;
                    orderDetails.forEach((detail: any) => {
                        const idProduct = detail.product.id;
                        const sold =
                            Number(detail.product.sold) +
                            Number(detail.quantity);
                        return updateProductFunc({
                            id: idProduct,
                            sold: sold,
                        });
                    });
                }
            }
            switch (STATUS) {
                case STATUS_ACTIVE:
                    CustomToastify('Đã xác nhận giao đơn này', TOAST_INFO);
                    break;
                case STATUS_SUCCESS:
                    CustomToastify(
                        'Xác nhận đơn hàng thành công',
                        TOAST_SUCCESS
                    );
                    break;
                default:
                    return;
            }
        } catch (error) {
            CustomToastify(error, TOAST_ERROR);
            console.log('[ORDER CARD CONFIRM]', error);
        }
    }

    async function handleClickRejectOrder(message: string) {
        try {
            setModalShow(false);
            setMessageModal(false);
            const { id } = order;
            const updatedOrder = await updateOrderFunc({
                id: id,
                status: STATUS_FAILED,
                message: message,
            });
            // handleUpdateStatusOrder(updatedOrder);
            CustomToastify('Bạn đã từ chối đơn hàng', TOAST_ERROR);
        } catch (error) {
            CustomToastify(error, TOAST_ERROR);
            console.log('[ORDER CARD REJECT]', error);
        }
    }

    return (
        <>
            <Container
                fluid
                className="cardOrderContainer py-0 rounded-3 border border-dark position-relative"
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
                {badge && (
                    <Badge
                        bg="danger"
                        className="position-absolute ml-3"
                        style={{ left: 0 }}
                    >
                        Đơn mới
                    </Badge>
                )}
                <Row className="p-0" style={{ height: 80 }}>
                    <Col sm={1} className="p-0">
                        <Image
                            src={avatar}
                            width={80}
                            height={80}
                            alt="user avatar"
                            style={{
                                backgroundColor: 'white',
                                width: '100%',
                                aspectRatio: '1',
                                objectFit: 'cover',
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
                onConfirm={() => setConfirmModal(true)}
                onCancel={() => setMessageModal(true)}
                order={order}
            />
            <YesNoModal
                show={messageModal}
                message={true}
                data={{
                    title: 'Từ chối đơn hàng',
                    message: 'Bạn chắc chắn từ chối đơn hàng chứ?',
                }}
                onHide={() => setMessageModal(false)}
                onYesFunc={handleClickRejectOrder}
                onNoFunc={() => setMessageModal(false)}
            />
            <YesNoModal
                show={confirmModal}
                data={{
                    title: 'Xác nhận đơn hàng',
                    message:
                        order.status === STATUS_PENDING
                            ? 'Bạn xác nhận giao đơn hàng này không?'
                            : 'Bạn chắc chắn xác nhận đơn hàng thành công?',
                }}
                onHide={() => setConfirmModal(false)}
                onYesFunc={handleClickConfirmModal}
                onNoFunc={() => setConfirmModal(false)}
            />
        </>
    );
}

export default OrderCard;
