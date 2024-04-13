import { gql } from '@apollo/client';

export const addOrder = gql`
    mutation Mutation($createOrderInput: CreateOrderInput!) {
        createOrder(createOrderInput: $createOrderInput) {
            id
            id_agent
            id_deliver
            id_user
            address
            distance
            delivery_fee
            discount
            total_quantity
            total_price
            status
        }
    }
`;

export const updateOrder = gql`
    mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
        updateOrder(updateOrderInput: $updateOrderInput) {
            id
            id_agent
            id_deliver
            id_user
            address
            distance
            delivery_fee
            discount
            total_quantity
            total_price
            status
        }
    }
`;

export const removeOrder = gql`
    mutation RemoveOrder($removeOrderId: ID!) {
        removeOrder(id: $removeOrderId) {
            id
            id_agent
            id_deliver
            id_user
            address
            distance
            delivery_fee
            discount
            total_quantity
            total_price
            status
        }
    }
`;
