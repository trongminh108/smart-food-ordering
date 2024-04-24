import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function YesNoModal({ showModal }: { showModal: any }) {
    const [show, setShow] = useState(showModal);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style={{ zIndex: 10 }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Do not even try to
                press escape key.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default YesNoModal;
