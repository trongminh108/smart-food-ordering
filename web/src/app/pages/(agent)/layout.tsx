import { CHILDREN } from '@/app/constants/interfaces';
import AgentContainer from '@/app/containers/agent_container';
import React from 'react';

function AgentLayout({ children }: CHILDREN) {
    return <AgentContainer>{children}</AgentContainer>;
}

export default AgentLayout;
