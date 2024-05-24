// import './map_openstreetmap.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js';ss

import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useAuth } from '@/app/contexts/auth_context';
import LeafletRoutingMachine from '../leaflet_routing_machine/leaflet_routing_machine';

import { FullscreenControl } from 'react-leaflet-fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
    CustomToastify,
    displayDistance,
} from '@/app/modules/feature_functions';
import { useAgent } from '@/app/contexts/agent_context';
import Loading from '../loading/loading';
import { ConvertOrdersToGraph } from '@/app/modules/directions';
import { greedyHamiltonianPath } from '@/app/modules/greedy';
import OrderDetailsModal from '../order_details_modal/order_details_modal';
import YesNoModal from '../yes_no_modal/yes_no_modal';
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from '@/app/constants/name';
import { useUpdateOrderMutation } from '@/app/apollo-client/mutations/services';
import { STATUS_ACTIVE } from '@/app/constants/backend';

const ZOOM = 13;

function OpenStreetMapContainer({ orders, onHide }) {
    const { authState } = useAuth();
    const { delivers: deliversContext } = useAgent();

    const position = {
        lat: authState.user.agent.position[0],
        lng: authState.user.agent.position[1],
    };
    const [delivers, setDelivers] = useState(deliversContext.value);
    const [deliver, setDeliver] = useState(null);
    const [ordersDeliver, setOrdersDeliver] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [reload, setReload] = useState(0);
    const [order, setOrder] = useState(orders[0] || null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const updateOrderFunc = useUpdateOrderMutation();

    useEffect(() => {
        async function getDirections() {
            const graph = await ConvertOrdersToGraph(position, ordersDeliver);

            let { path, totalCost } = greedyHamiltonianPath(graph, 0);

            path.pop();
            path.shift();
            path = path.map((i) => i - 1);
            const res = [];
            for (let i = 0; i < ordersDeliver.length; i++) {
                res.push(ordersDeliver[path[i]]);
            }
            return res;
        }
        const promise = getDirections();
        promise.then((res) => {
            setOrdersDeliver(res);
            setIsLoading(false);
        });
    }, [orders, reload]);

    useEffect(() => {
        const value = deliversContext.value;
        if (value) {
            setDelivers([...value]);
        }
    }, [deliversContext.value]);

    function handleClickOptimize() {
        setIsLoading(true);
        setReload((prev) => prev + 1);
    }

    function handleClickOrder(order) {
        setOrder(order);
        setShowDetailModal(true);
    }

    function handleClickAddOrderDeliver(order) {
        setOrder(order);
        setShowDetailModal(true);
    }

    function handleConfirmOrder() {
        const isExist = ordersDeliver.some((o) => o.id == order.id);
        if (!isExist) setOrdersDeliver((prev) => [...prev, order]);
        setShowDetailModal(false);
    }

    function handleCancelOrder() {
        setOrdersDeliver((prev) => prev.filter((o) => o.id != order.id));
        setShowDetailModal(false);
    }

    function handleClickOrderMarker(e, order) {
        setOrdersDeliver((prev) => {
            const isExist = prev.filter((or) => or.id === order.id).length != 0;
            if (!isExist) {
                return [...prev, order];
            } else return prev;
        });
    }

    function handleClickDeliver(id) {
        setDeliver(id);
    }

    function handleClickSubmit() {
        let text = '';
        if (ordersDeliver.length == 0) {
            text = ' đơn hàng';
        }
        if (!deliver) text += text ? ' và người giao' : ' người giao';

        if (text) {
            CustomToastify('Vui lòng chọn' + text, TOAST_INFO);
        } else {
            const promises = [];
            const n = ordersDeliver.length;
            for (let i = n - 1; i >= 0; i--) {
                promises.push(
                    updateOrderFunc({
                        id: ordersDeliver[i].id,
                        id_deliver: deliver,
                        status: STATUS_ACTIVE,
                    })
                );
            }
            Promise.all(promises)
                .then(() => {
                    CustomToastify('Đã xác nhận giao', TOAST_SUCCESS);
                    onHide();
                })
                .catch(() => {
                    CustomToastify('Lỗi rồi', TOAST_ERROR);
                });
        }
        setShowSubmitModal(false);
    }

    if (!delivers) return <Loading message="Đang tải bản đồ..." />;
    return (
        <Container fluid className="w-100 h-100 p-0" style={{ zIndex: 1001 }}>
            <Row className="h-100 p-0 m-0">
                <Col xs={9} className="p-0">
                    {!isLoading ? (
                        <MapContainer
                            center={position}
                            zoom={ZOOM}
                            scrollWheelZoom={true}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <FullscreenControl position="topright" />
                            <LeafletRoutingMachine
                                origin={position}
                                ordersDeliver={ordersDeliver}
                                orders={orders}
                                onClickOrderMarker={handleClickOrderMarker}
                            />
                        </MapContainer>
                    ) : (
                        <Loading message="Đang tối ưu đường đi..." />
                    )}
                </Col>
                <Col xs={3} className="p-0">
                    <Row className="h-50 overflow-hidden m-0">
                        <Col className="gap-3 d-flex flex-column justify-content-start">
                            <div className="d-flex gap-3 mt-2">
                                <p className="mt-2 fw-bold">
                                    Thứ tự giao hàng:{' '}
                                </p>
                                <Button
                                    variant="success"
                                    onClick={handleClickOptimize}
                                >
                                    Tối ưu
                                </Button>
                            </div>
                            {ordersDeliver.map((order) => {
                                return (
                                    <Button
                                        key={order.id}
                                        className="fs-6 mx-2"
                                        style={{
                                            width: '80%',
                                            overflow: 'hidden',
                                        }}
                                        variant="primary"
                                        onClick={() => handleClickOrder(order)}
                                    >
                                        {`${
                                            order.recipient
                                        } - ${displayDistance(order.distance)}`}
                                    </Button>
                                );
                            })}
                            {orders.map((order) => {
                                const isExist =
                                    ordersDeliver.filter(
                                        (or) => or.id === order.id
                                    ).length != 0;
                                if (!isExist)
                                    return (
                                        <Button
                                            key={order.id}
                                            className="fs-6 mx-2"
                                            style={{
                                                width: '80%',
                                                overflow: 'hidden',
                                            }}
                                            variant="secondary"
                                            onClick={() =>
                                                handleClickAddOrderDeliver(
                                                    order
                                                )
                                            }
                                        >
                                            {`${
                                                order.recipient
                                            } - ${displayDistance(
                                                order.distance
                                            )}`}
                                        </Button>
                                    );
                            })}
                        </Col>
                    </Row>
                    <div
                        className="w-100"
                        style={{ border: '1px solid' }}
                    ></div>
                    <Row
                        className="m-0 overflow-scroll"
                        style={{ height: '40%' }}
                    >
                        <Col className="gap-3 d-flex flex-column justify-content-start">
                            <p className="mt-2 fw-bold">Nhân viên của quán: </p>
                            {delivers.map((de) => {
                                return (
                                    <Button
                                        key={de.id}
                                        className="fs-6 mx-2"
                                        style={{
                                            width: '80%',
                                            overflow: 'hidden',
                                        }}
                                        variant={
                                            deliver === de.id
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                        onClick={() =>
                                            handleClickDeliver(de.id)
                                        }
                                    >
                                        {`${de.user.full_name}`}
                                    </Button>
                                );
                            })}
                        </Col>
                    </Row>
                    <div
                        className="w-100"
                        style={{ border: '1px solid' }}
                    ></div>
                    <Row className="m-0 mt-2 justify-content-end">
                        <Col xs={6} className="d-flex justify-content-end">
                            <Button
                                variant="success"
                                onClick={() => setShowSubmitModal(true)}
                            >
                                Xác nhận
                            </Button>
                        </Col>
                        <Col xs={4}>
                            <Button variant="secondary" onClick={onHide}>
                                Đóng
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Modal */}
            <Row>
                <OrderDetailsModal
                    show={showDetailModal}
                    onHide={() => setShowDetailModal(false)}
                    onConfirm={handleConfirmOrder}
                    onCancel={handleCancelOrder}
                    order={order}
                    type={1}
                />
                <YesNoModal
                    show={showSubmitModal}
                    onHide={() => setShowSubmitModal(false)}
                    data={{
                        message: 'Bạn chắc chắn giao những đơn này chứ?',
                        title: 'Xác nhận giao hàng',
                    }}
                    onYesFunc={handleClickSubmit}
                    onNoFunc={() => setShowSubmitModal(false)}
                />
            </Row>
        </Container>
    );
}

export default OpenStreetMapContainer;
