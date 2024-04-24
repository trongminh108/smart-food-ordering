import { gql } from '@apollo/client';

export const PRODUCT_TYPE = `
    id
    id_category
    category {
        name
    }
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

export const getProductsByAgentID = gql`
    query Query($idAgent: ID!) {
        productsByAgentID(id_agent: $idAgent) {
            ${PRODUCT_TYPE}
        }
    }
`;
