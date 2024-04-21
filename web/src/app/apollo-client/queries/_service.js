// const [useGetAgentByUserID] = useLazyQuery(getAgentByUserID);

import { useLazyQuery, useQuery } from '@apollo/client';

import { getAgentByUserID } from './agents';

export const useGetAgentByUserIDQuery = async (id) => {
    const [useGetAgentByUserID] = useQuery(getAgentByUserID);

    const { data } = await useGetAgentByUserID({
        variables: { agentByUserIdId: id },
    });

    return data?.agentByUserID;
};
