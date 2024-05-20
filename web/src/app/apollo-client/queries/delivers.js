import { gql } from '@apollo/client';

export const DELIVER_TYPE = `
    id
    id_user
    user {
        avatar
        full_name
        phone_number
    }
    id_agent
    phone_number
    rating
    comments_quantity
`;

export const getDeliversByAgentID = gql`
    query DeliversByAgentID($idAgent: ID!) {
        deliversByAgentID(id_agent: $idAgent) {
            ${DELIVER_TYPE}
        }
    }
`;
