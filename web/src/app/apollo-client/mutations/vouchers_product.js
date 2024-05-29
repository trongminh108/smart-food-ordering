import { gql } from '@apollo/client';

export const VOUCHERS_PRODUCTS_TYPE = `
    id
    id_voucher
    id_product
`;

export const createVouchersProduct = gql`
    mutation Mutation(
        $createVouchersProductInput: CreateVouchersProductInput!
    ) {
        createVouchersProduct(
            createVouchersProductInput: $createVouchersProductInput
        ) {
            ${VOUCHERS_PRODUCTS_TYPE}
        }
    }
`;
