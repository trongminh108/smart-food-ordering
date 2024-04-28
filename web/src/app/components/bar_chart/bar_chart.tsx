import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container, Row } from 'react-bootstrap';
import {
    convertDate,
    getDatesInRange,
    sortProducts,
} from '@/app/modules/feature_function';
import { STATUS_SUCCESS } from '@/app/constants/backend';
import { SORT_DECREASE_SUBTOTAL } from '@/app/constants/name';
import Loading from '../loading/loading';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Thống kê sản phẩm',
        },
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Tổng tiền (VND)',
            },
        },
    },
};

interface BAR_CHART {
    labelDates: any;
    orders: any;
}

export function BarChart({ labelDates, orders }: BAR_CHART) {
    const labels = getDatesInRange(labelDates.fromDate, labelDates.toDate);
    const [products, setProducts] = React.useState<any>(null);

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
        setProducts(products);
    }, [labelDates]);

    const colors = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(231, 76, 60, 0.8)',
        'rgba(46, 204, 113, 0.8)',
        'rgba(52, 152, 219, 0.8)',
        'rgba(241, 196, 15, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(22, 160, 133, 0.8)',
        'rgba(52, 73, 94, 0.8)',
        'rgba(230, 126, 34, 0.8)',
        'rgba(26, 188, 156, 0.8)',
        'rgba(241, 196, 15, 0.8)',
        'rgba(189, 195, 199, 0.8)',
        'rgba(149, 165, 166, 0.8)',
        'rgba(236, 240, 241, 0.8)',
        'rgba(192, 57, 43, 0.8)',
    ];

    if (products === null)
        return <Loading message="Đang tải số liệu sản phẩm" />;
    if (products.length === 0)
        return <Loading loading={false} message="Chưa có số liệu sản phẩm" />;

    const data = {
        labels:
            products.map(
                (product: any) => `${product.name} (${product.sold})`
            ) || [],
        datasets: [
            {
                label: 'Sản phẩm',
                data: products.map((product: any) => product.subtotal) || [],
                backgroundColor: colors,
            },
        ],
    };

    return (
        <Container>
            <Row className="fw-bold">{`Thống kê sản phẩm bán ra - ${products.reduce(
                (acc: number, pro: any) => acc + pro.sold,
                0
            )} sản phẩm`}</Row>
            <Row className="w-75 m-auto">
                <Bar options={options} data={data} />
            </Row>
        </Container>
    );
}
