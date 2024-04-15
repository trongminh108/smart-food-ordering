import { gql } from '@apollo/client';

export const getAddress = gql`
    query Query($location: LocationInput!) {
        getAddressFromLocation(location: $location)
    }
`;

export const getDistanceDuration = gql`
    query GetDistanceBetweenLocation(
        $origins: LocationInput!
        $destinations: LocationInput!
    ) {
        getDistanceBetweenLocation(
            origins: $origins
            destinations: $destinations
        ) {
            distance
            duration
        }
    }
`;
