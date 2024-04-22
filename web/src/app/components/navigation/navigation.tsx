'use client';

import './navigation.scss';

// import Cookies from 'js-cookie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import Avatar from '@/app/components/avatar/avatar';
import SearchBar from '@/app/components/searchBar/searchBar';
import {
    AGENT_MANAGE_PAGE,
    HOME_PAGE,
    ORDERED_MANAGE_PAGE,
    ORDER_MANAGE_PAGE,
} from '@/app/constants/url';
// import { access_token_role } from '@/constants/cookies';
// import { useData } from '../context/context';

const dataNav = [
    {
        title: 'SFO',
        link: HOME_PAGE,
    },
    {
        title: 'Agent',
        link: AGENT_MANAGE_PAGE,
    },
    {
        title: 'Orders',
        link: ORDER_MANAGE_PAGE,
    },
];

const adminItem = {
    title: 'Admin',
    link: '/pages/admin/film/manage',
};

function Navigation() {
    const navRef = useRef<HTMLDivElement>(null);
    const [pathName, setPathName] = useState(usePathname());
    const [role_admin, setRole_admin] = useState('');
    // const { data } = useData();
    // let cookie_role = Cookies.get(access_token_role);

    useEffect(() => {
        const nav = navRef.current;
        const sticky = nav?.offsetTop ?? 0;

        window.onscroll = () => {
            if (window.scrollY > sticky) {
                nav?.classList.add('sticky');
            } else nav?.classList.remove('sticky');
        };

        try {
            if (pathName != '/') {
                const itemActive: any = nav?.querySelector('.nItem.active');
                const navBG: any = nav?.querySelector('.navBackground');
                navBG.style.left = itemActive.offsetLeft + 'px';
            }
        } catch (ex) {}

        // cookie_role = Cookies.get(access_token_role);
        // if (cookie_role) setRole_admin(cookie_role);
        // else setRole_admin(data);
    }, [pathName]);
    // [pathName, cookie_role, data]);

    function handleOnClickNavItem(event: any) {
        const nav = navRef.current;
        const itemActive = nav?.querySelector('.nItem.active');
        itemActive?.classList.remove('active');
        event.target.classList.add('active');
    }

    function handleOnMouseOverNavItem(event: any) {
        const nav = navRef.current;
        const navBG: HTMLDivElement | any =
            nav?.querySelector('.navBackground');
        navBG.style.left = event.target.offsetLeft + 'px';
    }

    function handleOnMouseLeaveNavItem(event: any) {
        const nav = navRef.current;
        const itemActive: any = nav?.querySelector('.active');
        const navBG: HTMLDivElement | any =
            nav?.querySelector('.navBackground');
        navBG.style.left = itemActive?.offsetLeft + 'px';
    }

    return (
        <div className="nav" ref={navRef}>
            <div className="navItems i1">
                {dataNav.map((item) => {
                    if (item.link == pathName) {
                        return (
                            <Link
                                key={item.title}
                                href={item.link}
                                className="nItem active"
                                onMouseOver={handleOnMouseOverNavItem}
                                onMouseLeave={handleOnMouseLeaveNavItem}
                                onClick={handleOnClickNavItem}
                            >
                                {item.title}
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={item.title}
                            href={item.link}
                            className="nItem"
                            onMouseOver={handleOnMouseOverNavItem}
                            onMouseLeave={handleOnMouseLeaveNavItem}
                            onClick={handleOnClickNavItem}
                        >
                            {item.title}
                        </Link>
                    );
                })}
                {role_admin == '1' && (
                    <Link
                        href={adminItem.link}
                        className="nItem"
                        onMouseOver={handleOnMouseOverNavItem}
                        onMouseLeave={handleOnMouseLeaveNavItem}
                        onClick={handleOnClickNavItem}
                    >
                        {adminItem.title}
                    </Link>
                )}
                <div className="navBackground"></div>
            </div>
            <div className="navItems i2">
                <SearchBar />
                <Avatar />
            </div>
        </div>
    );
}

export default Navigation;
