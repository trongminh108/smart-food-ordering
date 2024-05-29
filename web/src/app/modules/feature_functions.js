import Cookies from 'js-cookie';

import { TOKEN } from '@/app/constants/cookies';
import {
    SORT_DECREASE,
    SORT_DECREASE_DATE,
    SORT_DECREASE_NAME,
    SORT_DECREASE_SOLD,
    SORT_DECREASE_SUBTOTAL,
    SORT_DECREASE_TOTAL,
    SORT_DEFAULT,
    SORT_INCREASE,
    SORT_INCREASE_DATE,
    SORT_INCREASE_NAME,
    SORT_INCREASE_SOLD,
    SORT_INCREASE_TOTAL,
    TOAST_ERROR,
    TOAST_INFO,
    TOAST_SUCCESS,
    TOAST_WARNING,
} from '../constants/name';
import { BACKEND_URL_FILE_UPLOAD } from '../constants/backend';
import axios from 'axios';

//================================================ CURRENCY ===========================================
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

export function formatNumberWithDots(input) {
    if (input.length != 0) {
        const tmp = input.replaceAll('.', '');
        const number = Number(tmp);
        return number.toLocaleString('vi-VN');
    }
    return input;
}

//================================================ COOKIES ===========================================
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

//================================================ JWT ===========================================
export function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

//================================================ FOR GG MAP API ===========================================
export const displayDistance = (meter) => {
    if (meter >= 1000) return `${Math.round((meter / 1000) * 10) / 10}km`;
    return meter + 'm';
};

//==================================PRODUCTS======================================================
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

function sortProductsSubtotalDecrease(a, b) {
    const pA = a.subtotal;
    const pB = b.subtotal;
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
    else if (type === SORT_DECREASE_SUBTOTAL)
        products.sort(sortProductsSubtotalDecrease);
    return products;
}

//================================== ORDERS ======================================================
function sortOrdersTotalIncrease(a, b) {
    const pA = a.total_price;
    const pB = b.total_price;
    if (pA > pB) return 1;
    if (pA < pB) return -1;
    else return 1;
}

function sortOrdersTotalDecrease(a, b) {
    const pA = a.total_price;
    const pB = b.total_price;
    if (pA < pB) return 1;
    if (pA > pB) return -1;
    else return 1;
}

function sortOrdersDateIncrease(a, b) {
    const pA = a.updatedAt;
    const pB = b.updatedAt;
    if (pA > pB) return -1;
    if (pA < pB) return 1;
    else return 1;
}

function sortOrdersDateDecrease(a, b) {
    const pA = a.updatedAt;
    const pB = b.updatedAt;
    if (pA < pB) return -1;
    if (pA > pB) return 1;
    else return 1;
}

export function sortOrders(orders, type = SORT_DEFAULT) {
    if (orders.length <= 1) {
        console.log('Orders is order');
        return orders;
    }
    if (type === SORT_INCREASE_TOTAL) orders.sort(sortOrdersTotalIncrease);
    else if (type === SORT_DECREASE_TOTAL) orders.sort(sortOrdersTotalDecrease);
    else if (type === SORT_INCREASE_DATE || type === SORT_DEFAULT)
        orders.sort(sortOrdersDateIncrease);
    else if (type === SORT_DECREASE_DATE) orders.sort(sortOrdersDateDecrease);
    return orders;
}

//================================== DELIVERS ======================================================
function sortDeliversNameIncrease(a, b) {
    const pA = a.user.full_name;
    const pB = b.user.full_name;
    if (pA < pB) return 1;
    if (pA > pB) return -1;
    else return 1;
}

function sortDeliversNameDecrease(a, b) {
    const pA = a.user.full_name;
    const pB = b.user.full_name;
    if (pA > pB) return 1;
    if (pA < pB) return -1;
    else return 1;
}

export function sortDelivers(list, type = SORT_DEFAULT) {
    if (list.length <= 1) {
        console.log('Delivers is deliver');
        return list;
    }
    if (type === SORT_INCREASE_NAME) list.sort(sortDeliversNameIncrease);
    else if (type === SORT_DECREASE_NAME) list.sort(sortDeliversNameDecrease);

    return list;
}

//================================================ SEARCH ===========================================
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

//=============================================== UPLOAD FILE ===========================================
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

// =============================================== TOASTIFY ===========================================
import { toast, Bounce } from 'react-toastify';
export function CustomToastify(message, type = TOAST_SUCCESS) {
    const options = {
        position: 'bottom-left',
        autoClose: 2000,
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
    else if (type === TOAST_WARNING) return toast.warning(message, options);
}

//=============================================== DATE TIME ===========================================
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

export function calculateTimeFrom(inputDate) {
    const inputDateTime = new Date(inputDate);
    const currentTime = new Date();

    // Tính khoảng thời gian theo phút
    const timeDifferenceInMinutes = Math.round(
        (currentTime - inputDateTime) / 60000
    );

    if (timeDifferenceInMinutes <= 60) {
        // Nếu ít hơn hoặc bằng 60 phút, in ra số phút
        // if (timeDifferenceInMinutes <= 1) return 'Đơn mới';
        return `${timeDifferenceInMinutes} phút trước`;
    } else if (timeDifferenceInMinutes <= 1440) {
        // Nếu ít hơn hoặc bằng 24 giờ, in ra số giờ
        const hours = Math.floor(timeDifferenceInMinutes / 60);
        return `${hours} giờ trước`;
    } else {
        // Nếu nhiều hơn 24 giờ, tính theo ngày
        const days = Math.floor(timeDifferenceInMinutes / 1440);
        if (days > 1) return `${convertDate(inputDateTime)}`;
        return `${days} ngày trước`;
    }
}

//=============================================== API OSM MAP ===========================================
function API_OSM_GEOCODING(lat, lng) {
    return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
}

export async function getAddressOSM(position) {
    const url = API_OSM_GEOCODING(position.lat, position.lng);
    const data = await axios.get(url);
    const res = await data.data.display_name;
    return res;
}

//=============================================== VOUCHERS ===========================================
export function generateRandomCode(length = 10) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}
