import { gql } from '@apollo/client';

export const getOrdersByUserID = gql`
    query OrdersByUserID($ordersByUserIdId: ID!) {
        ordersByUserID(id: $ordersByUserIdId) {
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
