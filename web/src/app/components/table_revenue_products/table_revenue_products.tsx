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
    formatCurrency,
    getDatesInRange,
} from '@/app/modules/feature_function';
import Loading from '../loading/loading';

interface Column {
    id: 'index' | 'name' | 'price' | 'sold' | 'rating' | 'total';
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
    {
        id: 'total',
        label: 'Tổng tiền',
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
        orders.forEach((order: any) => console.log(order.order_details));
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
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
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
