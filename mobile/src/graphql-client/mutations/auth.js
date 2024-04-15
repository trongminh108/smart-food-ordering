import { gql } from '@apollo/client';

export const login = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
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
    }
`;

export const registerUser = gql`
    mutation Register($username: String!, $password: String!, $gmail: String!) {
        register(username: $username, password: $password, gmail: $gmail) {
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