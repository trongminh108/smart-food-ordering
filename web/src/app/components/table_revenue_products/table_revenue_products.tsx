import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
    convertDate,
    formatCurrency,
    getDatesInRange,
    sortProducts,
} from '@/app/modules/feature_function';
import Loading from '../loading/loading';
import { STATUS_SUCCESS } from '@/app/constants/backend';
import { SORT_DECREASE_SUBTOTAL } from '@/app/constants/name';

interface Column {
    id: 'index' | 'name' | 'price' | 'sold' | 'rating' | 'subtotal';
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
        id: 'subtotal',
        label: 'Tổng tiền',
        minWidth: 170,
        align: 'right',
        format: (value: number) => formatCurrency(value),
    },
    {
        id: 'rating',
        label: 'Đánh giá',
        minWidth: 170,
        align: 'right',
    },
];

interface Data {
    name: string;
    price: number;
    sold: number;
    rating: number;
    total: number;
}

function createData(
    name: string,
    price: number,
    sold: number,
    rating: number
): Data {
    const total = sold * price;
    return { name, price, sold, rating, total };
}

export default function TableRevenueProducts({
    labelDates,
    orders,
}: {
    labelDates: any;
    orders: any;
}) {
    const labels = getDatesInRange(labelDates.fromDate, labelDates.toDate);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState<any>(null);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        // orders.forEach((order: any) => console.log(order.order_details));
        const ordersValid = orders.filter((order: any) => {
            const orderDate = new Date(order.updatedAt);
            const from = new Date(labelDates.fromDate);
            const to = new Date(labelDates.toDate);
            return (
                labels.includes(convertDate(order.updatedAt)) &&
                order.status === STATUS_SUCCESS
            );
        });
        const allOrderDetails = ordersValid.flatMap(
            (order: any) => order.order_details
        );

        const res = allOrderDetails.reduce((acc: any, details: any) => {
            const id_product = details.product.id;
            const { images, ...product } = details.product;
            if (!acc[id_product]) {
                acc[id_product] = {
                    ...product,
                    sold: 0,
                    subtotal: 0,
                };
            }
            acc[id_product].sold += details.quantity;
            acc[id_product].subtotal += details.subtotal;
            return acc;
        }, {});

        const products = sortProducts(
            Object.values(res),
            SORT_DECREASE_SUBTOTAL
        );
        setRows(products);
    }, [labelDates]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (rows === null) return <Loading message="Đang tải số liệu sản phẩm" />;
    if (rows.length === 0)
        return <Loading loading={false} message="Chưa có số liệu sản phẩm" />;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    className="fw-bold bg-secondary"
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row: any, index: number) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {columns.map((column) => {
                                            let value;
                                            if (column.id !== 'index')
                                                value = row[column.id];
                                            else value = index + 1;
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
