import { gql } from '@apollo/client';

export const getAllProducts = gql`
    query Products {
        products {
            id
            id_category
            id_agent
            name
            images
            description
            sold
            price
            rating
        }
    }
`;
