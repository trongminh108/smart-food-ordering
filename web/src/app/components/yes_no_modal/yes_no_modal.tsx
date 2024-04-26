import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface YES_NO_MODAL {
    show: any;
    onHide: () => void;
    data: any;
    onYesFunc?: () => void;
    onNoFunc?: () => void;
}

function YesNoModal({ show, onHide, data, onYesFunc, onNoFunc }: YES_NO_MODAL) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            style={{ zIndex: 10000 }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{data.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{data.message}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onYesFunc}>
                    Chắc chắn
                </Button>
                <Button variant="secondary" onClick={onNoFunc}>
                    Hủy bỏ
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default YesNoModal;
