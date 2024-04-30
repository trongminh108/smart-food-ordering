import { gql } from '@apollo/client';

export const ORDER_TYPE = `
    id
    id_agent
    agent {
        id
        name
        images
        address
        rating
    }
    id_deliver
    id_user
    recipient
    user {
        avatar
        full_name
        phone_number
    }
    order_details {
        quantity
        discount
        subtotal
        product {
            id
            name
            images
            price
            sold
            rating
        }
    }
    phone_number
    position
    address
    distance
    delivery_fee
    discount
    total_quantity
    total_price
    message
    createdAt
    updatedAt
    status
`;

export const getOrdersByUserID = gql`
    query OrdersByUserID($ordersByUserIdId: ID!) {
        ordersByUserID(id: $ordersByUserIdId) {
            ${ORDER_TYPE}
        }
    }
`;

export const getOrdersByAgentID = gql`
    query OrdersByAgentID($ordersByAgentIdId: ID!) {
        ordersByAgentID(id: $ordersByAgentIdId) {
            ${ORDER_TYPE}
        }
    }
`;

export const getOrderByID = gql`
    query Query($orderId: ID!) {
        order(id: $orderId) {
            ${ORDER_TYPE}
        }
    }
`;
