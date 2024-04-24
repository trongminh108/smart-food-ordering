import { FormEventHandler, useEffect, useState } from 'react';
import {
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    InputGroup,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AddProductModal({
    show,
    onHide,
    onConfirm,
}: {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}) {
    function handleClickConfirm() {
        onHide();
        onConfirm();
    }

    const [formData, setFormData] = useState({
        name: '',
        image: null,
        price: '',
    });

    useEffect(() => {}, [show]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function handleOnChangeImage(event: any) {
        const file = event.target.files[0];
        // setAvatar(URL.createObjectURL(file));
        // setFileImg(file);
        setFormData((prev: any) => ({ ...prev, image: file }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Xử lý khi người dùng submit
        console.log('Form data:', formData);
        // Gọi hàm để xử lý dữ liệu
        // Đóng modal
        onHide();
    };

    function handleSetValidation(e: any, field: any, message: string) {
        if (field.trim().length === 0) {
            e.target.setCustomValidity(message);
        } else {
            e.target.setCustomValidity('');
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="p-0"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thêm sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <FormControl
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên sản phẩm"
                            required
                            onInvalid={(e) =>
                                handleSetValidation(
                                    e,
                                    formData.name,
                                    'Tên sản phẩm là bắt buộc'
                                )
                            }
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Hình ảnh</FormLabel>
                        <FormControl
                            type="file"
                            name="image"
                            onChange={handleOnChangeImage}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Giá bán</FormLabel>
                        <FormControl
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Nhập giá bán"
                            required
                            onInvalid={(e) =>
                                handleSetValidation(
                                    e,
                                    formData.name,
                                    'Phải nhập giá bán nữa'
                                )
                            }
                        />
                    </FormGroup>
                    <div className="d-flex gap-3 justify-content-end">
                        <Button type="submit" variant="success">
                            Thêm
                        </Button>
                        <Button onClick={onHide} variant="danger">
                            Hủy bỏ
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between"></Modal.Footer>
        </Modal>
    );
}
