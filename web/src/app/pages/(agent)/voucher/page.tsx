'use client';

import './voucher.css';

import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';

import Loading from '@/app/components/loading/loading';
import {
    RADIO_ALL_PRODUCTS,
    RADIO_DISCOUNT,
    RADIO_INFINITY,
    RADIO_LIMIT,
    RADIO_PERCENTAGE,
    RADIO_SPECIFIC_PRODUCTS,
    TOAST_ERROR,
    TOAST_INFO,
} from '@/app/constants/name';
import { useAgent } from '@/app/contexts/agent_context';
import {
    CustomToastify,
    formatNumberWithDots,
    generateRandomCode,
} from '@/app/modules/feature_functions';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    useCreateVoucherMutation,
    useCreateVouchersProductMutation,
} from '@/app/apollo-client/mutations/services';
import { useAuth } from '@/app/contexts/auth_context';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'stt', headerName: 'STT', width: 70 },
    { field: 'name', headerName: 'Tên sản phẩm', width: 200 },
    { field: 'price', headerName: 'Giá', width: 130 },
    {
        field: 'sold',
        headerName: 'Đã bán',
        type: 'number',
        width: 90,
    },
];

const columnsVouchers: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'stt', headerName: 'STT', width: 70 },
    { field: 'code', headerName: 'Mã giảm giá', width: 200 },
    { field: 'usage_limit', headerName: 'Số lượng sử dụng', width: 130 },
    // {
    //     field: 'sold',
    //     headerName: 'Đã bán',
    //     type: 'number',
    //     width: 90,
    // },
];

function VOUCHERS() {
    const { authState } = useAuth();

    const [formData, setFormData] = useState<any>({
        id_agent: authState.user.agent.id,
        code: '',
        from: '',
        to: '',
        discount: '0',
        is_percentage: true,
        is_valid: true,
        is_all_products: true,
        usage_limit: -1, //-1 is infinity
    });
    const [isLoading, setIsLoading] = useState(false);
    const [typeDiscount, setTypeDiscount] = useState(RADIO_PERCENTAGE);
    const [usageLimit, setUsageLimit] = useState(RADIO_INFINITY);
    const [usage, setUsage] = useState(0);
    const [discountProducts, setDiscountProducts] =
        useState(RADIO_ALL_PRODUCTS);

    const { products: productsContext, vouchers: vouchersContext } = useAgent();
    const [products, setProducts] = useState(productsContext.value);
    const [vouchers, setVouchers] = useState(vouchersContext.value);
    const [specificProducts, setSpecificProducts] = useState<any>([]);

    const createVoucherFunc = useCreateVoucherMutation();
    const createVouchersProductFunc = useCreateVouchersProductMutation();

    useEffect(() => {
        const pros = productsContext.value;
        if (pros) setProducts(pros);
    }, [productsContext.value]);

    useEffect(() => {
        const pros = vouchersContext.value;
        if (pros) setVouchers(pros);
    }, [vouchersContext.value]);

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
        if (type === RADIO_PERCENTAGE) {
            const tmp = Number(String(formData.discount).replaceAll('.', ''));
            const discount = tmp > 100 ? 100 : tmp;
            setFormData({
                ...formData,
                is_percentage: true,
                discount: String(discount),
            });
        } else setFormData({ ...formData, is_percentage: false });
    }

    function handleOnChangeRadioProducts(e: any) {
        const value = e.target.id;
        setDiscountProducts(value);
    }

    function handleCheckboxChange(rows: any) {
        setSpecificProducts(rows);
    }

    async function handleClickAddVoucher() {
        if (formData.code.length === 0) {
            CustomToastify('Mã giảm giá không được trống!', TOAST_INFO);
        } else if (formData.from.length === 0 || formData.to.length === 0) {
            CustomToastify(
                'Ngày bắt đầu và kết thúc không được trống!',
                TOAST_INFO
            );
        } else if (new Date(formData.from) > new Date(formData.to)) {
            CustomToastify(
                'Ngày bắt đầu phải nhỏ hơn bằng ngày kết thúc!',
                TOAST_INFO
            );
        } else if (
            usageLimit === RADIO_LIMIT &&
            (String(usage).length === 0 || Number(usage) <= 0)
        ) {
            CustomToastify('Số lượng giảm giá không hợp lệ!', TOAST_INFO);
        } else if (
            String(formData.discount).length == 0 ||
            Number(String(formData.discount).replaceAll('.', '')) <= 0
        ) {
            CustomToastify('Số tiền giảm giá không hợp lệ!', TOAST_INFO);
        } else if (
            discountProducts === RADIO_SPECIFIC_PRODUCTS &&
            specificProducts.length === 0
        ) {
            CustomToastify('Chưa chọn sản phẩm giảm giá!', TOAST_INFO);
        } else {
            if (usageLimit === RADIO_LIMIT)
                formData.usage_limit = Number(usage);
            if (typeDiscount === RADIO_PERCENTAGE)
                formData.discount = Number(formData.discount);
            else
                formData.discount = Number(
                    String(formData.discount).replaceAll('.', '')
                );
            if (discountProducts === RADIO_SPECIFIC_PRODUCTS)
                formData.is_all_products = false;

            try {
                console.log('[FORM]: ', formData);
                const voucher = await createVoucherFunc(formData);
                specificProducts.forEach((product: any) =>
                    createVouchersProductFunc({
                        id_voucher: voucher.id,
                        id_product: product,
                    })
                );
                console.log('[VOUCHER]: ', voucher);
                CustomToastify('Đã tạo mã giảm giá thành công!');
            } catch (error) {
                CustomToastify(
                    'Đã xảy ra lỗi khi tạo mã giảm giá!',
                    TOAST_ERROR
                );
                console.log('[CREATE VOUCHER]: ', error);
            }
        }
    }

    return (
        <Container>
            <Row className="mt-3">
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

            {/* Date */}
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
                        style={{ width: '15%' }}
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
                        disabled={usageLimit === RADIO_INFINITY}
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
                        style={{ width: '15%' }}
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
                            ? `Phần trăm giảm giá`
                            : `Số tiền giảm giá`}
                    </InputGroup.Text>
                    <FormControl
                        type="text"
                        name="discount"
                        value={
                            typeDiscount === RADIO_PERCENTAGE
                                ? String(formData.discount)
                                : formatNumberWithDots(
                                      String(formData.discount)
                                  )
                        }
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

            {/* Product */}
            <Row>
                <InputGroup className="mb-3 mt-3 d-flex align-items-center gap-5">
                    <InputGroup.Text id="basic-addon1" className="w-25">
                        Sản phẩm giảm giá
                    </InputGroup.Text>
                    <Form.Check
                        label=" Tất cả sản phẩm"
                        name="groupProduct"
                        type={'radio'}
                        style={{ width: '15%' }}
                        id={RADIO_ALL_PRODUCTS}
                        checked={discountProducts === RADIO_ALL_PRODUCTS}
                        onChange={handleOnChangeRadioProducts}
                    />
                    <Form.Check
                        label=" Chọn sản phẩm"
                        name="groupProduct"
                        type={'radio'}
                        style={{ width: '20%' }}
                        id={RADIO_SPECIFIC_PRODUCTS}
                        checked={discountProducts === RADIO_SPECIFIC_PRODUCTS}
                        onChange={handleOnChangeRadioProducts}
                    />
                </InputGroup>
            </Row>
            {/* <Row>
                {products ? (
                    products.map((pro: any) => (
                        <Col className="mt-3" xs={3} key={pro.id}>
                            <Form.Check
                                type="checkbox"
                                label={pro.name}
                                id={pro.id}
                                disabled={
                                    discountProducts === RADIO_ALL_PRODUCTS
                                }
                                checked={specificProducts.includes(pro.id)}
                                onChange={() => handleCheckboxChange(pro.id)}
                            />
                        </Col>
                    ))
                ) : (
                    <Loading message="Đang tải sản phẩm..." />
                )}
            </Row> */}
            {discountProducts === RADIO_SPECIFIC_PRODUCTS && (
                <Row>
                    <Row className="mx-3 p-0 fw-bold fs-6">{`Danh sách sản phẩm`}</Row>
                    <Col className="col-12" style={{ height: '500px' }}>
                        {products ? (
                            <DataGrid
                                rows={products.map(
                                    (product: any, index: number) => ({
                                        id: product.id,
                                        stt: index + 1,
                                        name: product.name,
                                        price: product.price,
                                        sold: product.sold,
                                    })
                                )}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            page: 0,
                                            pageSize: 10,
                                        },
                                    },
                                    columns: {
                                        columnVisibilityModel: {
                                            id: false,
                                        },
                                    },
                                }}
                                pageSizeOptions={[10, 15, 20]}
                                checkboxSelection
                                onRowSelectionModelChange={handleCheckboxChange}
                            />
                        ) : (
                            <Loading message="Đang tải sản phẩm..." />
                        )}
                    </Col>
                </Row>
            )}

            {/* Button add */}
            <Row className="d-flex justify-content-end my-3">
                <Col xs={2} className="d-flex justify-content-end">
                    <Button variant="success" onClick={handleClickAddVoucher}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>

            {/* Vouchers list */}
            <Row>
                <Row className="mx-3 p-0 fw-bold fs-6">{`Danh sách mã giảm giá`}</Row>
                <Col className="col-12" style={{ height: '500px' }}>
                    {vouchers ? (
                        <DataGrid
                            rows={vouchers.map(
                                (voucher: any, index: number) => ({
                                    id: voucher.id,
                                    stt: index + 1,
                                    code: voucher.code,
                                    usage_limit:
                                        voucher.usage_limit == -1
                                            ? 'Không giới hạn'
                                            : voucher.usage_limit,
                                    // sold: voucher.sold,
                                })
                            )}
                            columns={columnsVouchers}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        page: 0,
                                        pageSize: 10,
                                    },
                                },
                                columns: {
                                    columnVisibilityModel: {
                                        id: false,
                                    },
                                },
                            }}
                            pageSizeOptions={[10, 15, 20]}
                            checkboxSelection
                            onRowSelectionModelChange={handleCheckboxChange}
                        />
                    ) : (
                        <Loading message="Đang tải mã giảm giá..." />
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default VOUCHERS;
