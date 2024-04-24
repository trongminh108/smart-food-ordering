import Image from 'next/image';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import {
    Col,
    Container,
    FloatingLabel,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    InputGroup,
    Row,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {
    useAddProductMutation,
    useUpdateProductMutation,
} from '@/app/apollo-client/mutations/services';
import { BACKEND_IMAGES } from '@/app/constants/backend';
import colors from '@/app/constants/colors';
import { useAgent } from '@/app/contexts/agent_context';
import { useAuth } from '@/app/contexts/auth_context';
import { handleUploadFile } from '@/app/modules/feature_function';

import DropdownComponent from '../dropdown_component/dropdown_component';
import YesNoModal from '../yes_no_modal/yes_no_modal';

export default function UpdateProductModal({
    show,
    onHide,
    onDelete,
    product,
}: {
    show: boolean;
    onHide: () => void;
    onDelete: () => void;
    product: any;
}) {
    const { allCategories, products } = useAgent();
    const { authState } = useAuth();
    const [categories, setCategories] = useState([
        { value: '0', name: 'Đang tải' },
    ]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const defaultImage = require('@/assets/images/water.jpg');
    const [imageProduct, setImageProduct] = useState(
        product.images[0] != null
            ? BACKEND_IMAGES + product.images[0]
            : defaultImage
    );
    const fileImageRef = useRef<HTMLInputElement>(null);

    interface FORM_DATA {
        id: string;
        id_agent: string;
        id_category: string;
        name: string;
        images: any;
        description: string;
        price: number;
    }

    const [formData, setFormData] = useState<FORM_DATA>({
        id: product.id,
        id_agent: authState.user.agent.id,
        id_category: product.id_category,
        name: product.name,
        images: product.images,
        description: product.description,
        price: product.price,
    });

    useEffect(() => {
        URL.revokeObjectURL(imageProduct);
        if (product.images[0] != null)
            setImageProduct(BACKEND_IMAGES + product.images[0]);
        else setImageProduct(defaultImage);
        setFormData({
            id: product.id,
            id_agent: authState.user.agent.id,
            id_category: product.id_category,
            name: product.name,
            images: product.images,
            description: product.description,
            price: product.price,
        });
    }, [show]);

    useEffect(() => {
        if (allCategories.value) {
            const tmp = allCategories.value.map((cate: any) => ({
                value: cate.id,
                name: cate.name,
            }));
            setCategories(tmp);
            setFormData((prev: any) => ({
                ...prev,
                id_category: product.id_category,
            }));
        }
    }, [allCategories.value]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function handleChangeCategory(e: any) {
        const cate = e.target.value;
        setFormData((prev: any) => ({ ...prev, id_category: cate }));
    }

    function handleImageClick() {
        if (fileImageRef.current) {
            fileImageRef.current.click();
        }
    }

    function handleOnChangeImage(event: any) {
        const file = event.target.files[0];
        if (file) {
            const temp = URL.createObjectURL(file);
            setImageProduct(temp);
            setFormData((prev: any) => ({ ...prev, images: file }));
        }
    }

    const updateProductFunc = useUpdateProductMutation();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const { images, ...data } = formData;
        if (formData.images) await handleUploadFile(formData.images);
        formData.images = [images?.name];
        formData.price = Number(data.price);
        // Gọi hàm để xử lý dữ liệu
        const newProduct = await updateProductFunc(formData);
        products.setState((prev: any) =>
            prev.map((product: any) => {
                if (product.id === newProduct.id) return newProduct;
                return product;
            })
        );

        // // products.setState((prev: any) => [newProduct, ...prev]);
        console.log(formData);
        onHide();
    };

    function handleSetValidation(e: any, field: any, message: string) {
        if (field.trim().length === 0) {
            e.target.setCustomValidity(message);
        } else {
            e.target.setCustomValidity('');
        }
    }

    function handleDeleteProduct() {
        onHide();
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
                    Thông tin sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: colors.background }}>
                <Form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                >
                    <Container>
                        <Row>
                            <Col xs={4}>
                                <Image
                                    src={imageProduct}
                                    alt={formData.name}
                                    width={200}
                                    height={200}
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleImageClick}
                                />
                                <FormGroup className="mb-3">
                                    <FormLabel>Hình ảnh</FormLabel>
                                    <FormControl
                                        type="file"
                                        name="images"
                                        onChange={handleOnChangeImage}
                                        ref={fileImageRef}
                                        style={{ display: 'none' }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        Tên sản phẩm
                                    </InputGroup.Text>
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
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">
                                        Giá bán
                                    </InputGroup.Text>
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
                                                formData.price,
                                                'Phải nhập giá bán nữa'
                                            )
                                        }
                                    />
                                    <InputGroup.Text id="basic-addon1">
                                        VND
                                    </InputGroup.Text>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text>
                                        Loại sản phẩm
                                    </InputGroup.Text>
                                    <DropdownComponent
                                        onChange={handleChangeCategory}
                                        data={categories}
                                        defaultVal={formData.id_category}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                    <FloatingLabel controlId="floatingTextarea2" label="Mô tả">
                        <Form.Control
                            as="textarea"
                            placeholder="Viết mô tả sản phẩm"
                            style={{ height: '100px' }}
                            name="description"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </FloatingLabel>

                    <div className="d-flex gap-3 justify-content-end">
                        <Button type="submit" variant="success">
                            Chỉnh sửa
                        </Button>
                        <Button
                            onClick={() => {
                                console.log('You clicked Delete');
                                onDelete();
                            }}
                            variant="danger"
                        >
                            Xóa bỏ
                        </Button>
                        <Button onClick={onHide} variant="secondary">
                            Trở về
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between"></Modal.Footer>
        </Modal>
    );
}
