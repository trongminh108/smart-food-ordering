import { gql } from '@apollo/client';

export const getAllUsers = gql`
    query Users {
        users {
            username
        }
    }
`;
