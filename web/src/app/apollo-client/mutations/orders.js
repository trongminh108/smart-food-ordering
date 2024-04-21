import { gql } from '@apollo/client';
import { ORDER_TYPE } from '../queries/orders';

export const addOrder = gql`
    mutation Mutation($createOrderInput: CreateOrderInput!) {
        createOrder(createOrderInput: $createOrderInput) {
            ${ORDER_TYPE}
        }
    }
`;

export const updateOrder = gql`
    mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
        updateOrder(updateOrderInput: $updateOrderInput) {
            ${ORDER_TYPE}
        }
    }
`;

export const removeOrder = gql`
    mutation RemoveOrder($removeOrderId: ID!) {
        removeOrder(id: $removeOrderId) {
            ${ORDER_TYPE}
        }
    }
`;
