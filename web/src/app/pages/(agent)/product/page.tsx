'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import AddProductModal from '@/app/components/add_product_modal/add_product_modal';
import DropdownComponent from '@/app/components/dropdown_component/dropdown_component';
import UpdateProductModal from '@/app/components/update_product_modal/update_product_modal';
import colors from '@/app/constants/colors';
import {
    FILTER_DEFAULT,
    SORT_DECREASE,
    SORT_DECREASE_SOLD,
    SORT_DEFAULT,
    SORT_INCREASE,
    SORT_INCREASE_SOLD,
} from '@/app/constants/name';
import { useAgent } from '@/app/contexts/agent_context';
import {
    formatCurrency,
    searchIgnoreCaseAndDiacritics,
    sortProducts,
} from '@/app/modules/feature_function';
// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Loading from '@/app/components/loading/loading';

interface Column {
    id: 'index' | 'name' | 'price' | 'sold' | 'rating' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'index', label: 'STT', minWidth: 10 },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 170 },
    {
        id: 'price',
        label: 'Giá',
        minWidth: 170,
        format: (value: number) => formatCurrency(value),
    },
    {
        id: 'sold',
        label: 'Đã bán',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'rating',
        label: 'Đánh giá',
        minWidth: 170,
        align: 'right',
    },
];

function ProductPage() {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const { products: productsContext, categories: categoriesContext } =
        useAgent();
    const [products, setProducts] = useState(productsContext.value);
    const [categories, setCategories] = useState(categoriesContext.value);
    const [typeCombobox, setTypeCombobox] = useState({
        filter: FILTER_DEFAULT,
        sort: SORT_DEFAULT,
        search: '',
    });
    const dataSort = [
        { value: SORT_DEFAULT, name: 'Mặc định' },
        { value: SORT_INCREASE, name: 'Giá tăng dần' },
        { value: SORT_DECREASE, name: 'Giá giảm dần' },
        { value: SORT_INCREASE_SOLD, name: 'Số lượng bán tăng dần' },
        { value: SORT_DECREASE_SOLD, name: 'Số lượng bán giảm dần' },
    ];
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        if (productsContext.value) {
            setProducts([...productsContext.value]);
        }
        if (categoriesContext.value) {
            const dataFilterCate = categoriesContext.value.map((cate: any) => ({
                value: cate.id,
                name: cate.name,
            }));
            dataFilterCate.unshift({ value: 'all', name: 'Tất cả' });
            setCategories(dataFilterCate);
        }
    }, [productsContext.value, categoriesContext.value]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleChangeText(e: any) {
        const text = e.target.value;
        if (text.length === 0) {
            setTypeCombobox((prev) => ({ ...prev, search: '' }));
            let res: any = [...productsContext.value];

            if (typeCombobox.sort != SORT_DEFAULT) {
                res = sortProducts(res, typeCombobox.sort);
            }

            if (typeCombobox.filter != FILTER_DEFAULT) {
                res = res.filter(
                    (product: any) =>
                        product.id_category === typeCombobox.filter
                );
            }
            setProducts(res);
        }
    }

    function handleChangeSort(e: any) {
        const value = e.target.value;
        let res = [...productsContext.value];

        if (typeCombobox.filter != FILTER_DEFAULT)
            res = res.filter(
                (product: any) => product.id_category === typeCombobox.filter
            );
        if (typeCombobox.search.length != 0)
            res = res.filter((product: any) =>
                searchIgnoreCaseAndDiacritics(product.name, typeCombobox.search)
            );

        if (value === SORT_DEFAULT) setProducts(res);
        else {
            setProducts(sortProducts(res, value));
        }
        setTypeCombobox((prev) => ({ ...prev, sort: value }));
    }

    function handleChangeFilter(e: any) {
        const idCate = e.target.value;
        let res = [...productsContext.value];

        if (typeCombobox.sort != SORT_DEFAULT) {
            res = sortProducts(res, typeCombobox.sort);
        }
        if (typeCombobox.search.length != 0) {
            res = res.filter((product: any) =>
                searchIgnoreCaseAndDiacritics(product.name, typeCombobox.search)
            );
        }

        if (idCate != FILTER_DEFAULT)
            setProducts(
                res.filter((product: any) => product.id_category === idCate)
            );
        else setProducts(res);
        setTypeCombobox((prev) => ({ ...prev, filter: idCate }));
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const keyword = event.target.value;
            let res: any = [...productsContext.value];

            if (typeCombobox.sort != SORT_DEFAULT) {
                res = sortProducts(res, typeCombobox.sort);
            }

            if (typeCombobox.filter != FILTER_DEFAULT) {
                res = res.filter(
                    (product: any) =>
                        product.id_category === typeCombobox.filter
                );
            }

            if (keyword.length != 0)
                setProducts(
                    res.filter((product: any) =>
                        searchIgnoreCaseAndDiacritics(product.name, keyword)
                    )
                );
            else setProducts(res);
            setTypeCombobox((prev) => ({ ...prev, search: keyword }));
        }
    };

    function handleClickRow(row: any) {
        setSelectedRow(row);
        setUpdateModal(true);
    }

    if (!products || !categories)
        return <Loading loading={true} message="Đang tải sản phẩm của quán" />;
    if (products && categories)
        return (
            <Container fluid className="d-flex flex-column gap-4 my-4">
                <Row className="d-flex justify-content-end">
                    <Col className="d-flex align-items-end">
                        <Form className="w-100">
                            <Form.Control
                                type="text"
                                placeholder="Tìm sản phẩm..."
                                onKeyDown={handleKeyDown}
                                onChange={handleChangeText}
                            />
                        </Form>
                    </Col>
                    <Col xs={2}>
                        {'Sản phẩm: '}
                        <DropdownComponent
                            onChange={handleChangeFilter}
                            data={categories}
                        />
                    </Col>
                    <Col xs={3}>
                        {'Sắp xếp: '}
                        <DropdownComponent
                            onChange={handleChangeSort}
                            data={dataSort}
                        />
                    </Col>
                </Row>
                {products.length != 0 ? (
                    <Row>
                        <Paper
                            sx={{ width: '100%', overflow: 'hidden' }}
                            className=""
                        >
                            <TableContainer sx={{ maxHeight: '83vh' }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{
                                                        minWidth:
                                                            column.minWidth,
                                                    }}
                                                    className="fw-bold"
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row: any, index: any) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            handleClickRow(row)
                                                        }
                                                    >
                                                        {columns.map(
                                                            (column) => {
                                                                let value;
                                                                if (
                                                                    column.id !==
                                                                    'index'
                                                                )
                                                                    value =
                                                                        row[
                                                                            column
                                                                                .id
                                                                        ];
                                                                else
                                                                    value =
                                                                        index +
                                                                        1;
                                                                return (
                                                                    <TableCell
                                                                        key={
                                                                            column.id
                                                                        }
                                                                        align={
                                                                            column.align
                                                                        }
                                                                    >
                                                                        {column.format &&
                                                                        typeof value ===
                                                                            'number'
                                                                            ? column.format(
                                                                                  value
                                                                              )
                                                                            : value}
                                                                    </TableCell>
                                                                );
                                                            }
                                                        )}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Row>
                ) : (
                    <Loading loading={false} message="Quán chưa có sản phẩm" />
                )}

                <Row>
                    <Col xs={3}>
                        <Button
                            style={{
                                backgroundColor: colors.secondary,
                                borderColor: colors.secondary,
                            }}
                            onClick={() => setAddModal(true)}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <AddProductModal
                        show={addModal}
                        onHide={() => setAddModal(false)}
                        onConfirm={() => {
                            return;
                        }}
                    />
                </Row>
                {products.length != 0 && (
                    <Row>
                        <UpdateProductModal
                            show={updateModal}
                            onHide={() => setUpdateModal(false)}
                            product={selectedRow ? selectedRow : products[0]}
                        />
                    </Row>
                )}
            </Container>
        );

    if (products && products.length == 0)
        return <Loading loading={false} message="Quán chưa có sản phẩm" />;
}

export default ProductPage;
