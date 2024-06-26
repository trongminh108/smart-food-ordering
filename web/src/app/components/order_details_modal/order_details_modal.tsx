import { STATUS_ACTIVE, STATUS_PENDING } from '@/app/constants/backend';
import { formatCurrency } from '@/app/modules/feature_functions';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function OrderDetailsModal({
    show,
    onHide,
    onConfirm,
    onCancel,
    order,
    type = 0,
}: {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    onCancel: () => void;
    order: any;
    type?: number;
}) {
    function handleClickCancelOrder() {
        onCancel();
    }

    function handleClickConfirm() {
        onConfirm();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header
                closeButton
                className="d-flex flex-column-reverse align-items-start"
            >
                <p className="mt-3">{`Địa chỉ: ${order.address}`}</p>
                <Modal.Title id="contained-modal-title-vcenter">
                    {`${order.recipient} - SDT: ${order.phone_number}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>Thực đơn</h4> */}
                {order.order_details.map((details: any, index: any) => (
                    <div key={index} className="d-flex align-items-between">
                        <p
                            style={{ width: '100%' }}
                        >{`${details.quantity} x ${details.product.name}`}</p>
                        <p>{`${formatCurrency(details.subtotal)}`}</p>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <h5 className="fw-bold">
                    {`Tổng tiền: ${formatCurrency(order.total_price)}`}
                    {order.message && ` - (Lý do thất bại: ${order.message})`}
                </h5>

                {(order.status === STATUS_PENDING ||
                    order.status === STATUS_ACTIVE) && (
                    <div className="d-flex gap-3">
                        <Button onClick={handleClickConfirm} variant="success">
                            Xác nhận
                        </Button>
                        <Button onClick={onCancel} variant="danger">
                            {type == 0 ? 'Từ chối' : 'Giao sau'}
                        </Button>
                        <Button onClick={onHide} variant="secondary">
                            Đóng
                        </Button>
                    </div>
                )}
            </Modal.Footer>
        </Modal>
    );
}
