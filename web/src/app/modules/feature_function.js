import Cookies from 'js-cookie';

import { TOKEN } from '@/app/constants/cookies';
import {
    SORT_DECREASE,
    SORT_DECREASE_SOLD,
    SORT_INCREASE,
    SORT_INCREASE_SOLD,
} from '../constants/name';

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

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

function sortProductsPriceIncrease(a, b) {
    const pA = a.price;
    const pB = b.price;
    if (pA > pB) return 1;
    if (pA < pB) return -1;
    else return 1;
}

function sortProductsSoldIncrease(a, b) {
    const pA = a.sold;
    const pB = b.sold;
    if (pA > pB) return 1;
    if (pA < pB) return -1;
    else return 1;
}

function sortProductsPriceDecrease(a, b) {
    const pA = a.price;
    const pB = b.price;
    if (pA < pB) return 1;
    if (pA > pB) return -1;
    else return 1;
}

function sortProductsSoldDecrease(a, b) {
    const pA = a.sold;
    const pB = b.sold;
    if (pA < pB) return 1;
    if (pA > pB) return -1;
    else return 1;
}

export function sortProducts(products, type = SORT_INCREASE) {
    if (products.length <= 1) {
        console.log('Products is product');
        return products;
    }
    if (type === SORT_INCREASE) products.sort(sortProductsPriceIncrease);
    else if (type === SORT_DECREASE) products.sort(sortProductsPriceDecrease);
    else if (type === SORT_INCREASE_SOLD)
        products.sort(sortProductsSoldIncrease);
    else if (type === SORT_DECREASE_SOLD)
        products.sort(sortProductsSoldDecrease);
    return products;
}

export function searchIgnoreCaseAndDiacritics(text, keyword) {
    const normalizedText = text.toLowerCase();
    const normalizedKeyword = keyword.toLowerCase();

    const removeDiacritics = (str) => {
        return str
            .normalize('NFD') // Chuẩn hóa chuỗi thành Unicode (NFD)
            .replace(/[\u0300-\u036f]/g, ''); // Loại bỏ các ký tự dấu
    };

    const normalizedTextWithoutDiacritics = removeDiacritics(normalizedText);
    const normalizedKeywordWithoutDiacritics =
        removeDiacritics(normalizedKeyword);

    return normalizedTextWithoutDiacritics.includes(
        normalizedKeywordWithoutDiacritics
    );
}
