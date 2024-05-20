import 'react-toastify/dist/ReactToastify.css';

import Modal from 'react-bootstrap/Modal';
import colors from '@/app/constants/colors';
import GGMapOrders from '../gg_map_orders/gg_map_orders';
import OpenStreetMapContainer from '../map_openstreetmap/map_openstreetmap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

export default function MapOrdersModal({
    show,
    onHide,
    orders,
}: {
    show: boolean;
    onHide: () => void;
    orders: any;
}) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="p-0"
            fullscreen={true}
        >
            {/* <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter d-flex flex-row"
                    className="fs-5"
                >
                    {`Vi trí các đơn hàng:`}
                </Modal.Title>
            </Modal.Header> */}
            <Modal.Body
                style={{ backgroundColor: colors.background }}
                className="p-0"
            >
                {/* <GGMapOrders orders={orders} /> */}
                <OpenStreetMapContainer orders={orders} onHide={onHide} />
            </Modal.Body>
            {/* <Modal.Footer className="d-flex justify-content-between"></Modal.Footer> */}
        </Modal>
    );
}
