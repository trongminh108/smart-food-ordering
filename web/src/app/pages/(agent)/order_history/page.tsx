'use client';

import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

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
import DropdownComponent from '@/app/components/dropdown_component/dropdown_component';
import {
    SORT_DECREASE_DATE,
    SORT_DECREASE_TOTAL,
    SORT_DEFAULT,
    SORT_INCREASE_DATE,
    SORT_INCREASE_TOTAL,
} from '@/app/constants/name';
import {
    searchIgnoreCaseAndDiacritics,
    sortOrders,
} from '@/app/modules/feature_functions';

function OrderHistory() {
    const { orders: ordersContext } = useAgent();
    const [orders, setOrders] = useState(ordersContext.value);

    const [typeOrder, setTypeOrder] = useState(STATUS_ALL);
    const [typeCombobox, setTypeCombobox] = useState({
        filter: STATUS_ALL,
        sort: SORT_DEFAULT,
        search: '',
    });
    const dataSort = [
        { value: SORT_DEFAULT, name: 'Mặc định' },
        { value: SORT_INCREASE_TOTAL, name: 'Tổng tiền tăng dần' },
        { value: SORT_DECREASE_TOTAL, name: 'Tổng tiền giảm dần' },
        { value: SORT_INCREASE_DATE, name: 'Mới nhất' },
        { value: SORT_DECREASE_DATE, name: 'Cũ nhất' },
    ];

    function handleFilterOrders(orders: any) {
        const ordersHistory = orders.filter((order: any) => {
            return (
                order.status !== STATUS_PENDING && order.status !== STATUS_DRAFT
            );
        });
        return ordersHistory;
    }

    function handleChangeSort(e: any) {
        const value = e.target.value;
        setTypeCombobox((prev) => ({ ...prev, sort: value }));
    }

    function handleChangeText(e: any) {
        const text = e.target.value;
        if (text.length === 0) {
            setTypeCombobox((prev) => ({ ...prev, search: '' }));
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const keyword = event.target.value;
            setTypeCombobox((prev) => ({ ...prev, search: keyword }));
        }
    };

    function handleOnChangeType(e: any) {
        const type = e.target.value;
        setTypeOrder(type);
        setTypeCombobox((prev) => ({ ...prev, filter: type }));
    }

    useEffect(() => {
        if (ordersContext.value) {
            let res = handleFilterOrders(ordersContext.value);
            res = sortOrders(res, typeCombobox.sort);
            if (typeCombobox.filter !== STATUS_ALL)
                res = res.filter(
                    (order: any) => order.status === typeCombobox.filter
                );

            const keyword = typeCombobox.search;
            if (keyword.length != 0)
                res = res.filter((order: any) => {
                    if (order.recipient)
                        return searchIgnoreCaseAndDiacritics(
                            order.recipient,
                            keyword
                        );
                    return false;
                });
            setOrders(res);
        }
    }, [ordersContext.value, typeCombobox]);

    if (!orders) return <Loading message="Đang tải đơn" />;

    if (orders)
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center pt-5 gap-4 px-5"
                style={{ backgroundColor: '#ebecf0' }}
            >
                <Row className="d-flex justify-content-end w-100 m-0">
                    <Col className="d-flex align-items-end p-0">
                        <Form className="w-100">
                            <Form.Control
                                type="text"
                                placeholder="Tìm người nhận..."
                                onKeyDown={handleKeyDown}
                                onChange={handleChangeText}
                            />
                        </Form>
                    </Col>
                    <Col xs={3}>
                        {'Sắp xếp: '}
                        <DropdownComponent
                            onChange={handleChangeSort}
                            data={dataSort}
                        />
                    </Col>
                    <Col sm={2} className="p-0">
                        {'Loại hóa đơn: '}
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
