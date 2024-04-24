import { gql } from '@apollo/client';

export const CATEGORY_TYPE = `
    id
    name
`;

export const getAllCategories = gql`
    query Categories {
        categories {
            ${CATEGORY_TYPE}
        }
    }
`;
