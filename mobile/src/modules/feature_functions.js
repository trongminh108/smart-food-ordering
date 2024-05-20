import { ToastAndroid } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GG_MAP_API, GG_MAP_REVERSE_GEOCODING_API } from '../constants/backend';
import * as Location from 'expo-location';
import axios from 'axios';

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};

export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export function showToast(
    mess,
    duration = ToastAndroid.SHORT,
    gravity = ToastAndroid.BOTTOM
) {
    ToastAndroid.showWithGravity(mess, duration, gravity);
}

export const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Quyền truy cập vị trí bị từ chối!');
        return 'Vị trí bị từ chối';
    }
    currentLocation = await Location.getCurrentPositionAsync({});
    // console.log({
    //     lat: currentLocation.coords.latitude,
    //     lng: currentLocation.coords.longitude,
    // });
    return {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
    };
};

export const getAddressFromLocation = async (latlng) => {};

export const removeCodeAddress = (address) => {
    const commaIndex = address.indexOf(',');
    if (commaIndex !== -1) {
        const code = address.substring(0, commaIndex);
        if (code.includes('+')) return address.substring(commaIndex + 1).trim();
        else return address;
    }
    return address;
};

export const displayDistance = (meter) => {
    if (meter > 1000) return `${Math.round((meter / 1000) * 10) / 10}km`;
    return meter + 'm';
};

export function displayDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours} giờ ${minutes} phút`;
    } else if (minutes > 0) {
        return `${minutes} phút`;
    } else {
        return `${remainingSeconds} giây`;
    }
}

const fee3firstKM = 15000;
const feeKmNext = 5000;
export function calculateDeliveryFee(meter) {
    let km = meter / 1000;
    if (km <= 0) return 0;
    let res = 0;
    if (km >= 3) {
        res += fee3firstKM;
        km -= 3;
    } else return fee3firstKM;
    return res + Math.round(km) * feeKmNext;
}

import { Alert } from 'react-native';

export const showConfirmBox = (yesFunc) => {
    Alert.alert(
        'Thông báo',
        'Bạn chắc chắn đặt món này chứ?',
        [
            {
                text: 'No',
                // onPress: () => yesFunc(),
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => yesFunc(),
            },
        ],
        { cancelable: true }
    );
};

// for add and remove data
// export const updateCache = (client, { data: { insert_todos } }) => {
//     const data = client.readQuery({
//         query: FETCH_TODOS,
//         variables: {
//             isPublic,
//         },
//     });
//     const newTodo = insert_todos.returning[0];
//     const newData = {
//         todos: [newTodo, ...data.todos],
//     };
//     client.writeQuery({
//         query: FETCH_TODOS,
//         variables: {
//             isPublic,
//         },
//         data: newData,
//     });
// };

// for update data
// const [todoUpdate] = useMutation(
//     TOGGLE_TODO,
//     {
//       update(cache, { data }) {
//         const existingTodos : any = cache.readQuery({ query: GET_MY_TODOS });
//         const newTodos = existingTodos!.todos.map((t:any) => {
//           if (t.id === todo.id) {
//             return { ...t, ...data!.update_todos!.returning[0] };
//           } else {
//             return t;
//           }
//         });
//         cache.writeQuery({
//           query: GET_MY_TODOS,
//           data: {todos: newTodos}
//         });
//       }
//     }
//   );

export const getDistanceDuration = (distance, id_agent) => {
    let dis = -1;
    let dur = -1;
    if (distance.value.length != 0) {
        try {
            const tmp = distance?.value?.find(
                (ag) => ag?.id_agent === id_agent
            );
            return [tmp.distance, tmp.duration];
        } catch (error) {}
    }
    return [dis, dur];
};

export function convertDateTimeToUTC7(inputDateTimeString) {
    const inputDate = new Date(inputDateTimeString);
    const utc7Date = new Date(inputDate.getTime() + 7 * 60 * 60 * 1000);

    const day = utc7Date.getDate().toString().padStart(2, '0');
    const month = (utc7Date.getMonth() + 1).toString().padStart(2, '0');
    const year = utc7Date.getFullYear();
    const hours = utc7Date.getUTCHours().toString().padStart(2, '0');
    const minutes = utc7Date.getMinutes().toString().padStart(2, '0');
    const seconds = utc7Date.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} UTC+7`;

    return [formattedDate, formattedTime];
}

export function isValidPhoneNumber(phoneNumber) {
    const regex = /^\d{10}$/;
    if (phoneNumber.match(regex)) return true;
    return false;
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

export function handleSortOrders(ordersPending) {
    ordersPending.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
    });
    return ordersPending;
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
