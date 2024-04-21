import { SFO } from '@/app/constants/name';
import './header.scss';

import Image from 'next/image';
import { useAuth } from '@/app/contexts/auth_context';
import { useEffect, useState } from 'react';

function Header() {
    const { authState } = useAuth();
    const [title, setTitle] = useState(SFO);
    useEffect(() => {
        if (authState.authenticated && authState?.user?.is_agent) {
            setTitle(authState.user.agent.name);
        }
    }, [authState.authenticated]);

    return (
        <div className="header">
            <div className="logoHeaderLeftDiv">
                <Image
                    id={'logoHeaderLeft'}
                    alt="film poster"
                    className="logoHeaderLeft"
                    src={require('@/assets/images/LogoTGex.png')}
                    width={150}
                    height={150}
                />
            </div>
            <div>
                <h1 className="text-white">{title}</h1>
            </div>
            <div className="logoHeaderRight">
                <Image
                    id={'logoHeaderRight'}
                    alt="film poster"
                    className="logoHeaderRight"
                    src={require('@/assets/images/LogoTGex.png')}
                    width={150}
                    height={150}
                />
            </div>
        </div>
    );
}

export default Header;
