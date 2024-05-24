'use client';

import Link from 'next/link';
import './leftSidebar.scss';

import React, { useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import {
    ORDER_MANAGE_PAGE,
    PRODUCT_MANAGE_PAGE,
    REVENUE_PAGE,
    STAFF_MANAGE_PAGE,
    ORDERED_MANAGE_PAGE,
    INFO_AGENT,
    VOUCHERS,
} from '@/app/constants/url';

const dataLSB = [
    {
        name: 'Đơn mới',
        link: ORDER_MANAGE_PAGE,
    },
    {
        name: 'Sản phẩm',
        link: PRODUCT_MANAGE_PAGE,
    },
    {
        name: 'Nhân viên',
        link: STAFF_MANAGE_PAGE,
    },
    {
        name: 'Lịch sử',
        link: ORDERED_MANAGE_PAGE,
    },
    {
        name: 'Giảm giá',
        link: VOUCHERS,
    },
    {
        name: 'Doanh thu',
        link: REVENUE_PAGE,
    },
    {
        name: 'Cửa hàng',
        link: INFO_AGENT,
    },
];

function LeftSidebar() {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const itemActive = nav?.querySelector('.btnManage');
        itemActive?.classList.add('active');
    }, []);

    function handleOnClickNavItem(event: any) {
        const nav = navRef.current;
        const itemActive = nav?.querySelector('.btnManage.active');
        itemActive?.classList.remove('active');
        event.target.classList.add('active');
    }

    return (
        <Container fluid className="leftSidebarContainer" ref={navRef}>
            {dataLSB.map((item) => {
                return (
                    <Row
                        key={item.name}
                        className="d-flex justify-content-center"
                    >
                        <Link
                            href={item.link}
                            className="btnManage"
                            onClick={handleOnClickNavItem}
                        >
                            {item.name}
                        </Link>
                    </Row>
                );
            })}
        </Container>
    );
}

export default LeftSidebar;
