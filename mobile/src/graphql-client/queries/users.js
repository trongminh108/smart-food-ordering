import { gql } from '@apollo/client';

export const getAllUsers = gql`
    query Users {
        users {
            id
            username
            password
            full_name
            gmail
            avatar
            phone_number
            current_address
            delivery_address
            position
            is_agent
            is_deliver
            face_recognition
        }
    }
`;

export const getUserByUsername = gql`
    query UserByUsername($username: String!) {
        userByUsername(username: $username) {
            id
            username
            full_name
            gmail
            avatar
            phone_number
            current_address
            delivery_address
            position
            is_agent
            is_deliver
            face_recognition
        }
    }
`;
