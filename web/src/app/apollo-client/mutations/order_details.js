import { gql } from '@apollo/client';

export const ORDER_DETAILS_TYPE = `
    id
    id_order
    id_product
    quantity
    discount
    subtotal
    product {
        name
        images
    }
`;

export const addOrderDetails = gql`
    mutation CreateOrderDetail(
        $createOrderDetailInput: CreateOrderDetailInput!
    ) {
        createOrderDetail(createOrderDetailInput: $createOrderDetailInput) {
            ${ORDER_DETAILS_TYPE}
        }
    }
`;

export const updateOrderDetails = gql`
    mutation UpdateOrderDetail(
        $updateOrderDetailInput: UpdateOrderDetailInput!
    ) {
        updateOrderDetail(updateOrderDetailInput: $updateOrderDetailInput) {
            ${ORDER_DETAILS_TYPE}
        }
    }
`;

export const removeOrderDetails = gql`
    mutation RemoveOrderDetail($removeOrderDetailId: ID!) {
        removeOrderDetail(id: $removeOrderDetailId) {
            ${ORDER_DETAILS_TYPE}
        }
    }
`;
