import { gql } from '@apollo/client';

export const getAllAgents = gql`
    query Query {
        agents {
            id
            id_user
            name
            address
            position
            avatar
            images
            phone_number
            rating
            comments_quantity
        }
    }
`;

export const getAgentByID = gql`
    query Agent($agentId: ID!) {
        agent(id: $agentId) {
            id
            id_user
            name
            address
            position
            avatar
            images
            phone_number
            rating
            comments_quantity
        }
    }
`;