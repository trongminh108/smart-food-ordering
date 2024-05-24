import { gql } from '@apollo/client';

import { AGENT_TYPE } from '../queries/agents';

export const updateAgent = gql`
    mutation Mutation($updateAgentInput: UpdateAgentInput!) {
        updateAgent(updateAgentInput: $updateAgentInput) {
            ${AGENT_TYPE}
        }
    }
`;

export const removeAgent = gql`
    mutation RemoveAgent($removeAgentId: ID!) {
        removeAgent(id: $removeAgentId) {
            id
        }
    }
`;
