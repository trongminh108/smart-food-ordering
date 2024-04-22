import { gql } from '@apollo/client';
import { ORDER_TYPE } from '../queries/orders';

export const pubNewOrder = gql`
    subscription Subscription($idAgent: ID!) {
        pubNewOrder(id_agent: $idAgent) {
            ${ORDER_TYPE}
        }
    }
`;

export const pubUserStatusOrder = gql`
    subscription PubUserStatusOrder($idUser: ID!) {
        pubUserStatusOrder(id_user: $idUser) {
            ${ORDER_TYPE}
        }
    }
`;
