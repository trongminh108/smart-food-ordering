import { gql } from '@apollo/client';
import axios from 'axios';

export const getAddress = gql`
    query ExampleQuery($latlng: PositionInput!) {
        getAddressFromPosition(latlng: $latlng)
    }
`;

export const getDistanceDurationOSM = gql`
    query ExampleQuery($origin: PositionInput!, $destination: PositionInput!) {
        getDistanceDuration(origin: $origin, destination: $destination) {
            distance
            duration
        }
    }
`;

const OSM_API_GEOCODING = (lat, lng) =>
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
export const getAddressOSM_Axios = async (origins) => {
    const url = OSM_API_GEOCODING(origins.lat, origins.lng);
    const res = await axios.get(url);
    return res.data.display_name;
};

const OSM_API_DISTANCE_DURATION = (origin, destination) => {
    return `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;
};
export const getDistanceDurationOSM_Axios = async (origin, destination) => {
    const url = OSM_API_DISTANCE_DURATION(origin, destination);
    const res = await axios.get(url);
    return {
        distance: res.data.routes[0].distance,
        duration: res.data.routes[0].duration,
    };
};
