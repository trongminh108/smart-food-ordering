'use client';

import './avatar.scss';

// import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

// import { removeCookiesUser } from '@/features/Cookies';
// import { useData } from '../context/context';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/auth_context';
import { HOME_PAGE } from '@/app/constants/url';
import { BACKEND_IMAGES } from '@/app/constants/backend';

let optionData = [
    {
        title: 'Sign in',
    },
    {
        title: 'Sign up',
    },
];

function Avatar() {
    const avaContainer = useRef<HTMLDivElement>(null);
    const defaultAvatar = require('@/app/favicon.ico');
    const [username, setUsername] = useState('Sign in');
    const [avatar, setAvatar] = useState(defaultAvatar);
    // const cookieName = Cookies.get('access_token_username');
    const cookieName = '';
    // const { setData } = useData();
    const router = useRouter();
    const { authState, onLogout } = useAuth();

    useEffect(() => {
        if (authState.authenticated && authState?.user) {
            setUsername(authState?.user?.full_name);
            const userAvatar = authState.user.avatar;

            if (userAvatar) setAvatar(BACKEND_IMAGES + userAvatar);
            optionData = [
                {
                    title: 'Profile',
                },
                {
                    title: 'Setting',
                },
                {
                    title: 'Sign out',
                },
            ];
        } else {
            setUsername('Sign in');
            optionData = [
                {
                    title: 'Sign in',
                },
                {
                    title: 'Sign up',
                },
            ];
        }
    }, [authState]);

    const handleSignOut = () => {
        // Xóa cookie khi sign out

        alert(`Sign out ${username}`);
        onLogout();
        // setData('');

        // Cập nhật displayText khi sign out
        setUsername('Sign in');
        optionData = [
            {
                title: 'Sign in',
            },
            {
                title: 'Sign up',
            },
        ];
        router.replace(HOME_PAGE);
    };

    function handleOnClickAvatar() {
        const options: any =
            avaContainer.current?.querySelector('.options-avatar');
        options.classList.toggle('visible');
    }

    function handleOptionClick(item: any) {
        if (item.title === 'Sign out') {
            handleSignOut();
        }
    }

    return (
        <div className="container-avatar" ref={avaContainer}>
            <Link
                href={`/pages/signin`}
                className="text-decoration-none text-white"
            >
                <div className="btn-signin">{username}</div>
            </Link>
            <div
                className="avatarImage"
                onClick={handleOnClickAvatar}
                style={{ overflow: 'hidden' }}
            >
                <Image
                    src={avatar}
                    style={{ width: '100%', height: '100%' }}
                    width={100}
                    height={100}
                    alt="user avatar"
                />
            </div>
            <div className="options-avatar">
                {optionData.map((item) => {
                    let url = '';
                    if (item.title === 'Profile')
                        // url = `/pages/profile/${Cookies.get(
                        //     'access_token_username'
                        // )}`;
                        url = '';
                    else if (item.title === 'Sign in') url = `/pages/signin`;
                    else if (item.title === 'Sign up') url = `/pages/signup`;
                    return (
                        <Link
                            href={url}
                            key={item.title}
                            className="option text-decoration-none text-dark"
                            onClick={handleOnClickAvatar}
                        >
                            <div
                                onClick={() => {
                                    handleOptionClick(item);
                                }}
                            >
                                {item.title}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Avatar;
