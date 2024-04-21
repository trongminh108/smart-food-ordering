import { gql } from '@apollo/client';
import { ORDER_TYPE } from '../queries/orders';

export const pubNewOrder = gql`
    subscription Subscription($idAgent: ID!) {
        pubNewOrder(id_agent: $idAgent) {
            ${ORDER_TYPE}
        }
    }
`;
