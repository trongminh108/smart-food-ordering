import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import colors from '@/app/constants/colors';
import {
    convertDate,
    formatCurrency,
    getDatesInRange,
} from '@/app/modules/feature_function';
import { STATUS_FAILED, STATUS_SUCCESS } from '@/app/constants/backend';
import { Col, Container, Row } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Thống kê doanh thu',
        },
    },
    scales: {
        x: {
            title: {
                display: true,
                text: 'Ngày',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Doanh thu (VND)',
            },
        },
    },
};

interface LINE_CHART {
    labelDates: any;
    orders: any;
}

export default function LineChart({ labelDates, orders }: LINE_CHART) {
    const labels = getDatesInRange(labelDates.fromDate, labelDates.toDate);
    const [revenue, setRevenue] = useState<any>(null);
    const [failedRevenue, setFailedRevenue] = useState<any>(null);

    function createLabelTotals(orders: any, status: string) {
        const labelTotals: Record<string, number> = {};
        // Lặp qua mảng orders để tính tổng cho mỗi nhãn
        orders.forEach((order: any) => {
            const label = convertDate(order.updatedAt);
            // Chỉ tính tổng nếu order.status là STATUS_SUCCESS
            if (order.status === status) {
                // Nếu nhãn đã tồn tại trong đối tượng labelTotals, cộng giá trị mới vào tổng hiện có, nếu không, tạo một tổng mới
                labelTotals[label] =
                    (labelTotals[label] || 0) + order.total_price;
            }
        });
        return labelTotals;
    }

    const labelSuccessTotals = createLabelTotals(orders, STATUS_SUCCESS);
    const labelFailedTotals = createLabelTotals(orders, STATUS_FAILED);

    useEffect(() => {
        if (labelSuccessTotals) {
            const successOrders = orders.filter((order: any) => {
                return (
                    order.status === STATUS_SUCCESS &&
                    labels.includes(convertDate(order.updatedAt))
                );
            }).length;
            const res = labels.map((label) => labelSuccessTotals[label] || 0);
            setRevenue({
                orderQuantity: successOrders,
                revenue: res.reduce((acc, curr) => acc + curr, 0),
            });
        }
        if (labelFailedTotals) {
            const failedOrders = orders.filter((order: any) => {
                return (
                    order.status === STATUS_FAILED &&
                    labels.includes(convertDate(order.updatedAt))
                );
            }).length;
            const res = labels.map((label) => labelFailedTotals[label] || 0);
            setFailedRevenue({
                orderQuantity: failedOrders,
                revenue: res.reduce((acc, curr) => acc + curr, 0),
            });
        }
    }, [labelDates]);

    const data = {
        labels,
        datasets: [
            {
                label: 'Đơn thành công',
                data: labels.map((label) => labelSuccessTotals[label] || 0),
                borderColor: colors.status_success,
                backgroundColor: colors.status_success,
            },
            {
                label: 'Đơn thất bại',
                data: labels.map((label) => labelFailedTotals[label] || 0),
                borderColor: colors.status_failed,
                backgroundColor: colors.status_failed,
            },
        ],
    };

    return (
        <Container className="mt-3">
            <Row className="d-flex flex-column gap-3">
                <Row className="fw-bold">
                    {`Tổng doanh thu ${
                        revenue != null ? revenue.orderQuantity : 0
                    } đơn hàng: ${
                        revenue != null ? formatCurrency(revenue.revenue) : 0
                    }`}
                </Row>
                <Row className="fw-bold">
                    {`Tổng tiền đơn thất bại: ${
                        failedRevenue != null
                            ? formatCurrency(failedRevenue.revenue)
                            : 0
                    } (${
                        failedRevenue != null ? failedRevenue.orderQuantity : 0
                    } đơn)`}
                </Row>
            </Row>
            <Row className="w-75 m-auto">
                <Line options={options} data={data} />
            </Row>
        </Container>
    );
}
