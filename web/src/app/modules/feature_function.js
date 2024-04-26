import Cookies from 'js-cookie';

import { TOKEN } from '@/app/constants/cookies';
import {
    SORT_DECREASE,
    SORT_DECREASE_SOLD,
    SORT_INCREASE,
    SORT_INCREASE_SOLD,
    TOAST_ERROR,
    TOAST_INFO,
    TOAST_SUCCESS,
} from '../constants/name';
import { BACKEND_URL_FILE_UPLOAD } from '../constants/backend';
import axios from 'axios';

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

export async function handleUploadFile(file) {
    const formData = new FormData();
    await formData.append('file', file);
    return await axios
        .post(BACKEND_URL_FILE_UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((rej) => {
            console.log(rej.message);
        });
}

import { toast, Bounce } from 'react-toastify';
export function CustomToastify(message, type = TOAST_SUCCESS) {
    const options = {
        position: 'bottom-left',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
    };
    if (type === TOAST_SUCCESS) return toast.success(message, options);
    else if (type === TOAST_ERROR) return toast.error(message, options);
    else if (type === TOAST_INFO) return toast.info(message, options);
}

export function getDatesInRange(fromDate, toDate) {
    const dates = [];
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const currentDate = new Date(fromDate);

    // Loop through each day between fromDate and toDate
    while (currentDate <= to) {
        // Format the current date to 'dd/MM' and push it to the array
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        });
        dates.push(formattedDate);

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export function convertDate(date) {
    const currentDate = new Date(date);

    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    return formattedDate;
}

export function getMinMaxDates(dates) {
    if (dates.length === 0) {
        return { fromDate: null, toDate: null };
    }

    // Convert string dates to Date objects
    const dateObjects = dates.map((dateString) => new Date(dateString));

    // Find the minimum and maximum dates
    const fromDate = new Date(Math.min(...dateObjects));
    const toDate = new Date(Math.max(...dateObjects));

    // Return the minimum and maximum dates
    return { fromDate, toDate };
}
