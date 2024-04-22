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

export function calculateTimeFrom(inputDate) {
    const inputDateTime = new Date(inputDate);
    const currentTime = new Date();

    // Tính khoảng thời gian theo phút
    const timeDifferenceInMinutes = Math.round(
        (currentTime - inputDateTime) / 60000
    );

    if (timeDifferenceInMinutes <= 60) {
        // Nếu ít hơn hoặc bằng 60 phút, in ra số phút
        return `${timeDifferenceInMinutes} phút trước`;
    } else if (timeDifferenceInMinutes <= 1440) {
        // Nếu ít hơn hoặc bằng 24 giờ, in ra số giờ
        const hours = Math.floor(timeDifferenceInMinutes / 60);
        return `${hours} giờ trước`;
    } else {
        // Nếu nhiều hơn 24 giờ, tính theo ngày
        const days = Math.floor(timeDifferenceInMinutes / 1440);
        return `${days} ngày trước`;
    }
}
