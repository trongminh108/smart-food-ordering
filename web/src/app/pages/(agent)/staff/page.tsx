'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import DropdownComponent from '@/app/components/dropdown_component/dropdown_component';
import Loading from '@/app/components/loading/loading';
import {
    STATUS_ALL,
    STATUS_DRAFT,
    STATUS_PENDING,
} from '@/app/constants/backend';
import {
    FILTER_DEFAULT,
    FILTER_OFFLINE,
    FILTER_ONLINE,
    SORT_DECREASE_NAME,
    SORT_DEFAULT,
    SORT_INCREASE_NAME,
} from '@/app/constants/name';
import { useAgent } from '@/app/contexts/agent_context';
import {
    searchIgnoreCaseAndDiacritics,
    sortDelivers,
} from '@/app/modules/feature_functions';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';

interface Column {
    id: 'index' | 'name' | 'phone_number' | 'status' | 'rating';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'index', label: 'STT', minWidth: 10, align: 'right' },
    { id: 'name', label: 'Tên nhân viên', minWidth: 300 },
    { id: 'phone_number', label: 'SĐT', minWidth: 170 },
    {
        id: 'status',
        label: 'Tình trạng',
        minWidth: 170,
    },
    {
        id: 'rating',
        label: 'Đánh giá',
        minWidth: 100,
        align: 'right',
    },
];

function StaffPage() {
    const { delivers: deliversContext } = useAgent();
    const [delivers, setDelivers] = useState(deliversContext.value);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [typeCombobox, setTypeCombobox] = useState({
        filter: STATUS_ALL,
        sort: SORT_DEFAULT,
        search: '',
    });
    const dataSort = [
        { value: SORT_DEFAULT, name: 'Mặc định' },
        { value: SORT_INCREASE_NAME, name: 'Tên (A-Z)' },
        { value: SORT_DECREASE_NAME, name: 'Tên (Z-A)' },
    ];
    const dataFilter = [
        { value: FILTER_DEFAULT, name: 'Tất cả' },
        { value: FILTER_ONLINE, name: 'Online' },
        { value: FILTER_OFFLINE, name: 'Offline' },
    ];

    function handleFilterOrders(orders: any) {
        const ordersHistory = orders.filter((order: any) => {
            return (
                order.status !== STATUS_PENDING && order.status !== STATUS_DRAFT
            );
        });
        return ordersHistory;
    }

    function handleChangeSort(e: any) {
        const value = e.target.value;
        setTypeCombobox((prev) => ({ ...prev, sort: value }));
    }

    function handleChangeText(e: any) {
        const text = e.target.value;
        if (text.length === 0) {
            setTypeCombobox((prev) => ({ ...prev, search: '' }));
        }
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const keyword = event.target.value;
            setTypeCombobox((prev) => ({ ...prev, search: keyword }));
        }
    };

    function handleOnChangeType(e: any) {
        const type = e.target.value;
        setTypeCombobox((prev) => ({ ...prev, filter: type }));
    }

    useEffect(() => {
        if (deliversContext.value) {
            let res = [...deliversContext.value];
            res = sortDelivers(res, typeCombobox.sort);

            if (typeCombobox.filter === FILTER_ONLINE)
                res = delivers.filter(
                    (deliver: any) => deliver?.user?.is_login === true
                );
            else if (typeCombobox.filter === FILTER_OFFLINE)
                res = delivers.filter(
                    (deliver: any) => deliver?.user?.is_login === false
                );

            const keyword = typeCombobox.search;
            if (keyword.length != 0)
                res = res.filter((item: any) => {
                    if (item.user.full_name)
                        return searchIgnoreCaseAndDiacritics(
                            item.user.full_name,
                            keyword
                        );
                    return false;
                });

            setDelivers(res);
        }
    }, [deliversContext.value, typeCombobox]);

    function handleClickRow(row: any) {
        // setSelectedRow(row);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (!delivers) return <Loading message="Đang tải nhân viên giao hàng..." />;

    if (delivers)
        return (
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center pt-5 gap-4 px-5"
                style={{ backgroundColor: '#ebecf0' }}
            >
                <Row className="d-flex justify-content-end w-100 m-0">
                    <Col className="d-flex align-items-end p-0">
                        <Form className="w-100">
                            <Form.Control
                                type="text"
                                placeholder="Tìm nhân viên..."
                                onKeyDown={handleKeyDown}
                                onChange={handleChangeText}
                            />
                        </Form>
                    </Col>
                    <Col xs={3}>
                        {'Sắp xếp: '}
                        <DropdownComponent
                            onChange={handleChangeSort}
                            data={dataSort}
                        />
                    </Col>
                    <Col sm={2} className="p-0">
                        {'Tình trạng: '}
                        <DropdownComponent
                            onChange={handleOnChangeType}
                            data={dataFilter}
                        />
                    </Col>
                </Row>
                {delivers.length !== 0 ? (
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
                                        {delivers
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
                                                                switch (
                                                                    column.id
                                                                ) {
                                                                    case 'index':
                                                                        value =
                                                                            index +
                                                                            1;
                                                                        break;
                                                                    case 'name':
                                                                        value =
                                                                            row
                                                                                .user
                                                                                .full_name;
                                                                        break;
                                                                    case 'status':
                                                                        value =
                                                                            'offline';
                                                                        break;
                                                                    default:
                                                                        value =
                                                                            row[
                                                                                column
                                                                                    .id
                                                                            ];
                                                                }

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
                                count={delivers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Row>
                ) : (
                    <Loading
                        loading={false}
                        message="Hiện tại chưa có nhân viên giao hàng"
                    />
                )}
            </Container>
        );
}

export default StaffPage;
