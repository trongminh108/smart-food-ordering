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
import faker from 'faker';
import { Container, Row } from 'react-bootstrap';
import { getDatesInRange } from '@/app/modules/feature_function';

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
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

interface BAR_CHART {
    labelDates: any;
}

export function BarChart({ labelDates }: BAR_CHART) {
    const labels = getDatesInRange(labelDates.fromDate, labelDates.toDate);

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() =>
                    faker.datatype.number({ min: 0, max: 1000 })
                ),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() =>
                    faker.datatype.number({ min: 0, max: 1000 })
                ),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <Container>
            <Row className="w-75 m-auto">
                <Bar options={options} data={data} />
            </Row>
        </Container>
    );
}
