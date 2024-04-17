import { gql } from '@apollo/client';

export const pushAllOrders = gql`
    subscription Subscription {
        pubInfoOrder
    }
`;

export const pubNewOrder = gql`
    subscription Subscription($idAgent: ID!) {
        pubNewOrder(id_agent: $idAgent) {
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
                full_name
                current_address
                phone_number
            }
            order_details {
                quantity
                discount
                subtotal
                product {
                    name
                    images
                }
            }
            phone_number
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
