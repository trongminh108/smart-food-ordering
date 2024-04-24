import { gql } from '@apollo/client';

export const PRODUCT_TYPE = `
    id
    id_category
    id_agent
    name
    images
    description
    sold
    price
    rating
`;

export const getAllProducts = gql`
    query Products {
        products {
            ${PRODUCT_TYPE}
        }
    }
`;
