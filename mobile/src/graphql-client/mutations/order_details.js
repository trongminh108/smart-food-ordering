import { gql } from '@apollo/client';

export const addOrderDetails = gql`
    mutation CreateOrderDetail(
        $createOrderDetailInput: CreateOrderDetailInput!
    ) {
        createOrderDetail(createOrderDetailInput: $createOrderDetailInput) {
            id
            id_order
            id_product
            quantity
            discount
            subtotal
        }
    }
`;

export const updateOrderDetails = gql`
    mutation UpdateOrderDetail(
        $updateOrderDetailInput: UpdateOrderDetailInput!
    ) {
        updateOrderDetail(updateOrderDetailInput: $updateOrderDetailInput) {
            id
            id_order
            id_product
            quantity
            discount
            subtotal
        }
    }
`;

export const removeOrderDetails = gql`
    mutation RemoveOrderDetail($removeOrderDetailId: ID!) {
        removeOrderDetail(id: $removeOrderDetailId) {
            id
            id_order
            id_product
            quantity
            discount
            subtotal
        }
    }
`;
