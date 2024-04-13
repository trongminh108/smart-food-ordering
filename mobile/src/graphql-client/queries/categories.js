import { gql } from '@apollo/client';

export const getAllCategories = gql`
    query Categories {
        categories {
            id
            name
        }
    }
`;
