import { gql } from '@apollo/client';

export const VOUCHER_TYPE = `
    id  
    id_agent
    code
    from
    to
    discount
    is_percentage
    is_valid
    is_all_products
    usage_limit
`;

export const createVoucher = gql`
    mutation Mutation($createVoucherInput: CreateVoucherInput!) {
        createVoucher(createVoucherInput: $createVoucherInput) {
            ${VOUCHER_TYPE}
        }
    }
`;
