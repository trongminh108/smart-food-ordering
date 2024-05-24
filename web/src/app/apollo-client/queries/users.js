import { gql } from '@apollo/client';

import { AGENT_TYPE } from './agents';

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
        ${AGENT_TYPE}
    }
    is_deliver
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
