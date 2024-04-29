import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface YES_NO_MODAL {
    show: any;
    onHide: () => void;
    data: any;
    onYesFunc?: () => void;
    onNoFunc?: () => void;
    message?: boolean;
}

function YesNoModal({
    show,
    onHide,
    data,
    onYesFunc,
    onNoFunc,
    message = false,
}: YES_NO_MODAL) {
    const [text, setText] = useState('');

    function handleChange(e: any) {
        setText(e.target.value);
    }

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
            {message && (
                <FloatingLabel label="Nhập lý do">
                    <Form.Control
                        as="textarea"
                        placeholder="Lý do từ chối đơn hàng"
                        style={{ height: '100px' }}
                        name="description"
                        onChange={handleChange}
                        value={text}
                    />
                </FloatingLabel>
            )}
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
