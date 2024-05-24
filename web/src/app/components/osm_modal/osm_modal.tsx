import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';

import { getAddressOSM } from '@/app/modules/feature_functions';

const customMarkerIcon = new L.Icon({
    iconUrl: '/icons/store_location.png',
    iconSize: [47, 63],
    iconAnchor: [23, 62],
});

interface LOCATION_MARKER {
    pos: any;
    onSetPos: any;
}

function LocationMarker({ pos, onSetPos }: LOCATION_MARKER) {
    const [position, setPosition] = useState<any>(pos);

    useMapEvents({
        click(e: any) {
            const res = e.latlng;
            setPosition(res);
            onSetPos(res);
        },
    });

    return position === null ? null : (
        <Marker position={position} icon={customMarkerIcon}>
            {/* <Popup>{}</Popup> */}
        </Marker>
    );
}

interface OSM_MODAL {
    show: boolean;
    onHide: () => void;
    center: number[];
    onConfirm: any;
}

const ZOOM = 20;

function OSMModal({ show, onHide, center, onConfirm }: OSM_MODAL) {
    const [position, setPosition] = useState<any>(
        {
            lat: center[0],
            lng: center[1],
        } || null
    );
    const [address, setAddress] = useState<any>('đang tải...');

    useEffect(() => {
        async function getAddress() {
            const res = await getAddressOSM(position);
            setAddress(res);
        }
        getAddress();
    }, [position]);

    function handleClickConfirm() {
        onConfirm(position, address);
        onHide();
    }

    function handleClickClose() {
        onHide();
    }

    return (
        <Modal show={show} fullscreen={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title className="text-truncate">{`Vị trí cửa hàng: ${address}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <Container
                    fluid
                    className="w-100 p-0"
                    style={{ width: '100%', height: '100%' }}
                >
                    <Row style={{ width: '100%', height: '92%' }}>
                        <MapContainer
                            center={{ lat: center[0], lng: center[1] }}
                            zoom={ZOOM}
                            scrollWheelZoom={true}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <FullscreenControl position="topright" />
                            <LocationMarker
                                pos={position}
                                onSetPos={setPosition}
                            />
                        </MapContainer>
                    </Row>
                    <Row className="d-flex justify-content-end mt-1">
                        <Col xs={2} className="d-flex gap-3">
                            <Button
                                variant="success"
                                onClick={handleClickConfirm}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleClickClose}
                            >
                                Đóng
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default OSMModal;
