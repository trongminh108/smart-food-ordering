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
    vouchers_products {
        id
        id_voucher
        id_product
    }
`;

export const getVouchersByAgentID = gql`
    query VouchersByAgentID($idAgent: ID!) {
        vouchersByAgentID(id_agent: $idAgent) {
            ${VOUCHER_TYPE}
        }
    }
`;
