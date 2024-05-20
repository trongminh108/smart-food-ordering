import { gql } from '@apollo/client';

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
