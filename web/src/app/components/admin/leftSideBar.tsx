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
    ACCOUNTS_PAGE,
    AGENTS_PAGE,
    ADMIN_REVENUE_PAGE,
} from '@/app/constants/url';

const dataLSB = [
    {
        name: 'Tài khoản',
        link: ACCOUNTS_PAGE,
    },
    {
        name: 'Đối tác',
        link: AGENTS_PAGE,
    },
    {
        name: 'Doanh thu',
        link: ADMIN_REVENUE_PAGE,
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
