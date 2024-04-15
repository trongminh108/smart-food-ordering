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
        address = address.substring(commaIndex + 1).trim();
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
