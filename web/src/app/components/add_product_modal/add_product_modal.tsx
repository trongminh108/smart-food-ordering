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
import DropdownComponent from '../dropdown_component/dropdown_component';
import colors from '@/app/constants/colors';
import { useAgent } from '@/app/contexts/agent_context';
import { useAuth } from '@/app/contexts/auth_context';
import { useAddProductMutation } from '@/app/apollo-client/mutations/services';
import {
    CustomToastify,
    handleUploadFile,
} from '@/app/modules/feature_function';
import Image from 'next/image';
import { TOAST_ERROR } from '@/app/constants/name';

export default function AddProductModal({
    show,
    onHide,
    onConfirm,
}: {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
}) {
    const { allCategories, products } = useAgent();
    const { authState } = useAuth();
    const [categories, setCategories] = useState([
        { value: '0', name: 'Đang tải' },
    ]);
    const defaultImage = require('@/assets/images/water.jpg');
    const [imageProduct, setImageProduct] = useState(defaultImage);
    const fileImageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (allCategories.value) {
            const tmp = allCategories.value.map((cate: any) => ({
                value: cate.id,
                name: cate.name,
            }));
            setCategories(tmp);
            setFormData((prev: any) => ({
                ...prev,
                id_category: tmp[0].value,
            }));
        }
    }, [allCategories.value]);

    interface FORM_DATA {
        id_agent: string;
        id_category: string;
        name: string;
        images: any;
        description: string;
        price: number;
    }

    const [formData, setFormData] = useState<FORM_DATA>({
        id_agent: authState.user.agent.id,
        id_category: '',
        name: '',
        images: null,
        description: '',
        price: 0,
    });

    useEffect(() => {
        setImageProduct(defaultImage);
        URL.revokeObjectURL(imageProduct);
        setFormData({
            id_agent: authState.user.agent.id,
            id_category: categories[0].value,
            name: '',
            images: null,
            description: '',
            price: 0,
        });
    }, [show]);

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

    const addProductFunc = useAddProductMutation();
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            const { images, ...data } = formData;

            if (formData.images) {
                const fileName = await handleUploadFile(formData.images);
                console.log(formData.images);
                console.log(fileName);

                formData.images = [fileName];
            } else {
                formData.images = [images?.name];
            }

            formData.price = Number(data.price);
            if (formData.price <= 0) {
                CustomToastify('Giá sản phẩm phải lớn hơn 0', TOAST_ERROR);
                throw new Error('Giá sản phẩm phải lớn hơn 0');
            }
            // Gọi hàm để xử lý dữ liệu
            const newProduct = await addProductFunc(formData);
            products.setState((prev: any) => [newProduct, ...prev]);

            CustomToastify(`Đã thêm ${newProduct.name}`);
            onHide();
        } catch (error) {
            CustomToastify(error, TOAST_ERROR);
            console.log('[ADD PRODUCT MODAL] ', error);
        }
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
                                    style={{
                                        cursor: 'pointer',
                                        objectFit: 'cover',
                                    }}
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
                                        defaultVal={''}
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
