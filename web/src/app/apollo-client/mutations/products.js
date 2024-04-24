import { gql } from '@apollo/client';
import { PRODUCT_TYPE } from '../queries/products';

export const addProduct = gql`
    mutation Mutation($createProductInput: CreateProductInput!) {
        createProduct(createProductInput: $createProductInput) {
            ${PRODUCT_TYPE}
        }
    }
`;

export const updateProduct = gql`
    mutation Mutation($updateProductInput: UpdateProductInput!) {
        updateProduct(updateProductInput: $updateProductInput) {
            ${PRODUCT_TYPE}
        }
    }
`;
