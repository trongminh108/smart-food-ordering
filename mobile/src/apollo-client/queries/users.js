import { gql } from '@apollo/client';

export const USER_TYPE = `
    id
    username
    password
    full_name
    gmail
    avatar
    phone_number
    delivery_address
    is_agent
    agent {
        id
        name
    }
    is_deliver
    deliver {
        id_user
        id_agent        
    }
    face_recognition
`;

export const getAllUsers = gql`
    query Users {
        users {
            ${USER_TYPE}
        }
    }
`;

export const getUserByUsername = gql`
    query UserByUsername($username: String!) {
        userByUsername(username: $username) {
            ${USER_TYPE}
        }
    }
`;
