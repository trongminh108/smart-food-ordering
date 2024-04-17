import { gql } from '@apollo/client';

export const AGENT_TYPE = `
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
`;

export const getAllAgents = gql`
    query Query {
        agents {
            ${AGENT_TYPE}
        }
    }
`;

export const getAgentByID = gql`
    query Agent($agentId: ID!) {
        agent(id: $agentId) {
            ${AGENT_TYPE}
        }
    }
`;

export const getAgentByUserID = gql`
    query Query($agentByUserIdId: ID!) {
        agentByUserID(id: $agentByUserIdId) {
            ${AGENT_TYPE}
        }
    }
`;
