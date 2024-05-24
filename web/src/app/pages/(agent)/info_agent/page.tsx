'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import {
    Button,
    Col,
    Container,
    FormControl,
    FormGroup,
    FormLabel,
    InputGroup,
    Row,
} from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import {
    useRemoveAgentMutation,
    useUpdateAgentMutation,
} from '@/app/apollo-client/mutations/services';
import YesNoModal from '@/app/components/yes_no_modal/yes_no_modal';
import { BACKEND_IMAGES } from '@/app/constants/backend';
import { TOAST_ERROR, TOAST_SUCCESS } from '@/app/constants/name';
import { useAuth } from '@/app/contexts/auth_context';
import {
    CustomToastify,
    handleUploadFile,
} from '@/app/modules/feature_functions';
import OSMModal from '@/app/components/osm_modal/osm_modal';

function InfoAgent() {
    const { authState, onLogout } = useAuth();
    const agent = authState.user.agent;
    const defaultImage = require('@/assets/images/water.jpg');
    const [imageAgent, setImageAgent] = useState(
        agent?.images[0] ? BACKEND_IMAGES + agent?.images[0] : defaultImage
    );
    const [imageChange, setImageChange] = useState(false);
    const fileImageRef = useRef<HTMLInputElement>(null);

    const [showMapModal, setShowMapModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const updateAgentFunc = useUpdateAgentMutation();
    const removeAgentFunc = useRemoveAgentMutation();

    const router = useRouter();

    const [formData, setFormData] = useState<any>({
        id: agent.id,
        name: agent.name,
        images: agent.images,
        address: agent.address,
        position: agent.position,
        phone_number: agent.phone_number,
        avatar: agent.avatar,
    });

    function handleImageClick() {
        if (fileImageRef.current) {
            fileImageRef.current.click();
        }
    }

    function handleOnChangeImage(event: any) {
        const file = event.target.files[0];
        if (file) {
            const temp = URL.createObjectURL(file);
            setImageAgent(temp);
            setFormData((prev: any) => ({ ...prev, images: [file] }));
            setImageChange(true);
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    function handleSetValidation(e: any, field: any, message: string) {
        if (field.trim().length === 0) {
            e.target.setCustomValidity(message);
        } else {
            e.target.setCustomValidity('');
        }
    }

    function handleClickChangeAddress(position: any, address: string) {
        setFormData((prev: any) => ({
            ...prev,
            position: [position.lat, position.lng],
            address: address,
        }));
    }

    function handleClickRating() {
        alert('You click Rating');
    }

    async function handleConfirmUpdate() {
        try {
            const { images, ...data } = formData;
            if (formData.images && imageChange) {
                const imageName = await handleUploadFile(...images);
                console.log('IMAGE: ', imageName);
                formData.images = [imageName];
                authState.user.agent.images = [imageName];
            } else {
                formData.images = agent.images;
            }

            const newAgent = await updateAgentFunc(formData);
            authState.user.agent = { ...authState.user.agent, ...newAgent };
            CustomToastify(
                `Đã cập nhật ${agent.name} thành công!`,
                TOAST_SUCCESS
            );
            setShowUpdateModal(false);
        } catch (error) {
            CustomToastify(
                'Có lỗi xảy ra khi chỉnh sửa cửa hàng!',
                TOAST_ERROR
            );
        }
    }

    async function handleConfirmDelete() {
        try {
            // removeAgentFunc(agent.id);
            CustomToastify(`Đã xóa ${agent.name} thành công!`, TOAST_SUCCESS);
            setShowDeleteModal(false);
            router.replace('/');
            onLogout();
        } catch (error) {
            CustomToastify(
                'Có lỗi xảy ra khi xóa cửa hàng! Vui lòng liên hệ với Admin',
                TOAST_ERROR
            );
        }
    }

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col xs={3}>
                    <Image
                        src={imageAgent}
                        alt={formData.name}
                        width={250}
                        height={250}
                        style={{
                            width: '100%',
                            aspectRatio: '1',
                            cursor: 'pointer',
                            objectFit: 'cover',
                        }}
                        onClick={handleImageClick}
                    />
                    <FormGroup className="mb-3">
                        <FormLabel
                            className=" w-100 text-center py-1"
                            style={{
                                backgroundColor: '#DEE2E6',
                                borderBottomLeftRadius: '1rem',
                                borderBottomRightRadius: '1rem',
                            }}
                        >
                            Hình ảnh
                        </FormLabel>
                        <FormControl
                            type="file"
                            name="images"
                            onChange={handleOnChangeImage}
                            ref={fileImageRef}
                            style={{ display: 'none' }}
                        />
                    </FormGroup>
                </Col>
                <Col xs={9}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" className="w-25">
                            Tên cửa hàng
                        </InputGroup.Text>
                        <FormControl
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập tên cửa hàng"
                            required
                            onInvalid={(e) =>
                                handleSetValidation(
                                    e,
                                    formData.name,
                                    'Tên cửa hàng là bắt buộc'
                                )
                            }
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" className="w-25">
                            Địa chỉ
                        </InputGroup.Text>
                        <FormControl
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Nhập địa chỉ"
                            required
                            onInvalid={(e) =>
                                handleSetValidation(
                                    e,
                                    formData.address,
                                    'Phải nhập địa chỉ'
                                )
                            }
                        />
                        <Button
                            onClick={() => setShowMapModal(true)}
                            id="basic-addon1"
                        >
                            Thay đổi
                        </Button>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" className="w-25">
                            Số điện thoại
                        </InputGroup.Text>
                        <FormControl
                            type="number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            required
                            onInvalid={(e) =>
                                handleSetValidation(
                                    e,
                                    formData.phone_number,
                                    'Số điện thoại là bắt buộc'
                                )
                            }
                        />
                    </InputGroup>

                    {/* rating */}
                    <InputGroup className="mb-3" style={{ cursor: 'pointer' }}>
                        <InputGroup.Text
                            id="basic-addon1"
                            onClick={handleClickRating}
                        >
                            {`Đánh giá: ${agent.rating} `}{' '}
                            <FaStar
                                style={{ color: '#e6e600', marginRight: '4px' }}
                            />
                            <u className="">
                                {' '}
                                {` (${agent.comments_quantity} bình luận)`}
                            </u>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="d-flex justify-content-end">
                <Col className="d-flex gap-3 col-3">
                    <Button
                        variant="success"
                        onClick={() => setShowUpdateModal(true)}
                    >
                        {' '}
                        Chỉnh sửa{' '}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        {' '}
                        Xóa cửa hàng{' '}
                    </Button>
                </Col>
            </Row>
            <Row>
                <YesNoModal
                    data={{
                        title: 'Chỉnh sửa cửa hàng',
                        message: 'Bạn đồng ý chỉnh sửa thông tin cửa hàng chứ?',
                    }}
                    show={showUpdateModal}
                    onHide={() => setShowUpdateModal(false)}
                    onNoFunc={() => setShowUpdateModal(false)}
                    onYesFunc={handleConfirmUpdate}
                />
                <YesNoModal
                    data={{
                        title: 'Xóa cửa hàng',
                        message: `Bạn đồng ý xóa cửa hàng chứ?
                            (sau khi xóa sẽ không thể khôi phục)`,
                    }}
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onNoFunc={() => setShowDeleteModal(false)}
                    onYesFunc={handleConfirmDelete}
                />
                <OSMModal
                    show={showMapModal}
                    onHide={() => setShowMapModal(false)}
                    center={agent.position}
                    onConfirm={handleClickChangeAddress}
                />
            </Row>
        </Container>
    );
}

export default InfoAgent;
