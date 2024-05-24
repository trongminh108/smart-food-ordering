'use client';

import './voucher.css';

import React, { useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';

import { generateRandomCode } from '@/app/modules/feature_functions';
import {
    RADIO_DISCOUNT,
    RADIO_INFINITY,
    RADIO_LIMIT,
    RADIO_PERCENTAGE,
} from '@/app/constants/name';

function VOUCHERS() {
    const [formData, setFormData] = useState({
        code: '',
        from: '',
        to: '',
        discount: 0,
        is_percentage: true,
        is_valid: true,
        is_all_product: true,
        usage_limit: -1, //-1 is infinity
    });
    const [typeDiscount, setTypeDiscount] = useState(RADIO_PERCENTAGE);
    const [usageLimit, setUsageLimit] = useState(RADIO_INFINITY);
    const [usage, setUsage] = useState(0);

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

    function handleGenerateCode() {
        const code = generateRandomCode();
        setFormData({ ...formData, code: code });
    }

    function handleOnChangeRadioUsageLimit(e: any) {
        const type = e.target.id;
        setUsageLimit(type);
        if (type === RADIO_INFINITY)
            setFormData({ ...formData, usage_limit: -1 });
        else setFormData({ ...formData, usage_limit: Number(usage) });
    }

    function handleChangeUsageLimit(e: any) {
        const value = e.target.value;
        setUsage(value);
    }

    function handleOnChangeRadioButton(e: any) {
        const type = e.target.id;
        setTypeDiscount(type);
        if (type === RADIO_PERCENTAGE)
            setFormData({ ...formData, is_percentage: true });
        else setFormData({ ...formData, is_percentage: false });
    }

    function handleClickAddVoucher() {
        console.log('[VOUCHER]: ', formData);
    }

    return (
        <Container>
            <Row>
                {/* Code Voucher */}
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1" className="w-25">
                        Mã giảm giá
                    </InputGroup.Text>
                    <FormControl
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        placeholder="Nhập mã giảm giá"
                        required
                        onInvalid={(e) =>
                            handleSetValidation(
                                e,
                                formData.code,
                                'Mã giảm giá là bắt buộc'
                            )
                        }
                    />
                    <Button variant="primary" onClick={handleGenerateCode}>
                        Khởi tạo
                    </Button>
                </InputGroup>
            </Row>
            <Row>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1" className="w-25">
                        Từ ngày
                    </InputGroup.Text>
                    <Form.Control
                        type="date"
                        name="from"
                        placeholder="DateRange"
                        className="w-25"
                        disabled={false}
                        onChange={handleChange}
                    />
                    <InputGroup.Text
                        id="basic-addon1"
                        className="w-25 font-weight-bold"
                    >
                        đến ngày
                    </InputGroup.Text>
                    <Form.Control
                        type="date"
                        name="to"
                        placeholder="DateRange"
                        className="w-25"
                        disabled={false}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Row>

            {/* usage limit */}
            <Row>
                <InputGroup className="mb-3 d-flex align-items-center gap-5">
                    <InputGroup.Text id="basic-addon1" className="w-25">
                        Số lượng mã giảm giá
                    </InputGroup.Text>
                    <Form.Check
                        label=" Vô hạn"
                        name="group_usage"
                        type={'radio'}
                        style={{ width: '10%' }}
                        id={RADIO_INFINITY}
                        checked={usageLimit === RADIO_INFINITY}
                        onChange={handleOnChangeRadioUsageLimit}
                    />
                    <Form.Check
                        label=" Số lượng "
                        name="group_usage"
                        type={'radio'}
                        style={{ width: '10%' }}
                        id={RADIO_LIMIT}
                        checked={usageLimit === RADIO_LIMIT}
                        onChange={handleOnChangeRadioUsageLimit}
                    />
                    <FormControl
                        type="number"
                        name="usage"
                        className="w-25"
                        value={usage}
                        onChange={handleChangeUsageLimit}
                        placeholder="Nhập số lượng giảm giá"
                        required
                        onInvalid={(e) =>
                            handleSetValidation(
                                e,
                                usage,
                                'Số lượng giảm giá là bắt buộc'
                            )
                        }
                    />
                </InputGroup>
            </Row>

            {/* Discount */}
            <Row>
                <InputGroup className="mb-3 d-flex align-items-center gap-5">
                    <InputGroup.Text id="basic-addon1" className="w-25">
                        Giảm giá theo
                    </InputGroup.Text>
                    <Form.Check
                        label=" Phần trăm"
                        name="group1"
                        type={'radio'}
                        style={{ width: '10%' }}
                        id={RADIO_PERCENTAGE}
                        checked={typeDiscount === RADIO_PERCENTAGE}
                        onChange={handleOnChangeRadioButton}
                    />
                    <Form.Check
                        label=" Số tiền cố định"
                        name="group1"
                        type={'radio'}
                        style={{ width: '20%' }}
                        id={RADIO_DISCOUNT}
                        checked={typeDiscount === RADIO_DISCOUNT}
                        onChange={handleOnChangeRadioButton}
                    />
                </InputGroup>
            </Row>
            <Row>
                <InputGroup>
                    <InputGroup.Text id="basic-addon1" className="w-25">
                        {typeDiscount === RADIO_PERCENTAGE
                            ? `Nhập phần trăm giảm giá`
                            : `Nhập số tiền giảm giá`}
                    </InputGroup.Text>
                    <FormControl
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        placeholder="Nhập số tiền giảm giá"
                        required
                        onInvalid={(e) =>
                            handleSetValidation(
                                e,
                                formData.code,
                                'Số tiền giảm giá là bắt buộc'
                            )
                        }
                    />
                    <InputGroup.Text id="basic-addon1" style={{ width: '10%' }}>
                        {typeDiscount === RADIO_PERCENTAGE ? `%` : `VND`}
                    </InputGroup.Text>
                </InputGroup>
            </Row>
            <Row className="d-flex justify-content-end mt-3">
                <Col xs={2} className="d-flex justify-content-end">
                    <Button variant="success" onClick={handleClickAddVoucher}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default VOUCHERS;
