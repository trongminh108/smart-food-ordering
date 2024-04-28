'use client';

import { BarChart } from '@/app/components/bar_chart/bar_chart';
import LineChart from '@/app/components/line_chart/line_char';
import Loading from '@/app/components/loading/loading';
import { PieChart } from '@/app/components/pie_chart/pie_chart';
import TableRevenueProducts from '@/app/components/table_revenue_products/table_revenue_products';
import { RADIO_PERIOD, RADIO_SO_FAR, TOAST_INFO } from '@/app/constants/name';
import { useAgent } from '@/app/contexts/agent_context';
import { CustomToastify, getMinMaxDates } from '@/app/modules/feature_function';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function RevenuePage() {
    const { orders: ordersContext } = useAgent();
    const [orders, setOrders] = useState<any>(ordersContext);
    const [selectedOption, setSelectedOption] = useState(RADIO_SO_FAR);
    const [fromDate, setFromDate] = useState<any>(null);
    const [toDate, setToDate] = useState<any>(null);
    const [labels, setLabels] = useState<any>(null);

    useEffect(() => {
        const dataOrders = ordersContext.value;
        if (dataOrders) {
            setOrders(dataOrders);
            const dateOrders = dataOrders.map((order: any) => order.updatedAt);
            const res = getMinMaxDates(dateOrders);
            setLabels(res);
        }
    }, [ordersContext.value]);

    function handleOnChangeRadioButton(e: any) {
        const rbtnID = e.target.id;
        setSelectedOption(rbtnID);
    }

    function handleWatchStatistics() {
        if (selectedOption === RADIO_SO_FAR) {
            const dateOrders = orders.map((order: any) => order.updatedAt);
            setLabels(getMinMaxDates(dateOrders));
        } else if (selectedOption === RADIO_PERIOD) {
            if (fromDate == null || toDate == null) {
                CustomToastify('Bạn phải chọn ngày thống kê', TOAST_INFO);
            } else if (fromDate > toDate) {
                CustomToastify(
                    'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
                    TOAST_INFO
                );
            } else {
                setLabels({
                    fromDate: new Date(fromDate),
                    toDate: new Date(toDate),
                });
            }
        }
    }
    if (!orders || labels === null)
        return <Loading message="Đang tải dữ liệu thống kê" />;

    if (orders && orders.length != 0)
        return (
            <Container>
                <Row>
                    <Form>
                        <Container className="my-3">
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form.Check
                                                label="Từ trước đến nay"
                                                name="group1"
                                                type={'radio'}
                                                id={RADIO_SO_FAR}
                                                checked={
                                                    selectedOption ===
                                                    RADIO_SO_FAR
                                                }
                                                onChange={
                                                    handleOnChangeRadioButton
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="d-flex align-items-center">
                                        <Col xs={3}>
                                            <Form.Check
                                                label="Khoảng thời gian từ "
                                                name="group1"
                                                type={'radio'}
                                                id={RADIO_PERIOD}
                                                checked={
                                                    selectedOption ===
                                                    RADIO_PERIOD
                                                }
                                                onChange={
                                                    handleOnChangeRadioButton
                                                }
                                            />
                                        </Col>
                                        <Col xs={3}>
                                            <Form.Control
                                                type="date"
                                                name="fromDate"
                                                placeholder="DateRange"
                                                disabled={
                                                    selectedOption !==
                                                    RADIO_PERIOD
                                                }
                                                // value={fromDate}
                                                onChange={(e) =>
                                                    setFromDate(e.target.value)
                                                }
                                            />
                                        </Col>
                                        <Col
                                            xs={1}
                                            className="d-flex justify-content-center"
                                        >{` đến `}</Col>
                                        <Col xs={3} className="">
                                            <Form.Control
                                                type="date"
                                                name="toDate"
                                                placeholder="DateRange"
                                                disabled={
                                                    selectedOption !==
                                                    RADIO_PERIOD
                                                }
                                                // value={toDate}
                                                onChange={(e) =>
                                                    setToDate(e.target.value)
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col
                                    xs={2}
                                    className="d-flex align-items-center"
                                >
                                    <Button onClick={handleWatchStatistics}>
                                        Xem thống kê
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <LineChart labelDates={labels} orders={orders} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <BarChart labelDates={labels} orders={orders} />
                    </Col>
                </Row>
            </Container>
        );
    return <Loading loading={false} message="Không có dữ liệu thống kê" />;
}
