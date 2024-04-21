import Cookies from 'js-cookie';

import { TOKEN } from '@/app/constants/cookies';

export function setCookiesLogin(acc) {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 7);
    const optionCookie = {
        expires: expirationDate,
        path: '/',
    };
    Cookies.set(TOKEN, acc);
}

export function removeCookiesLogin() {
    Cookies.remove(TOKEN);
    // Cookies.remove('access_token');
    // Cookies.remove('access_token_username');
    // Cookies.remove('access_token_gmail');
    // Cookies.remove('access_token_role');
}

export function getCookies(name) {
    return Cookies.get(name);
}

export function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

export const displayDistance = (meter) => {
    if (meter >= 1000) return `${Math.round((meter / 1000) * 10) / 10}km`;
    return meter + 'm';
};
