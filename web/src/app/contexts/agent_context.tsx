import { createContext, useContext, useState } from 'react';

const AgentContext = createContext<any>(null);

import React from 'react';
import { CHILDREN } from '../constants/interfaces';

function AgentProvider({ children }: CHILDREN) {
    const [statusOrder, setStatusOrder] = useState(null);

    const value = {
        statusOrder: { value: statusOrder, setState: setStatusOrder },
    };
    return (
        <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
    );
}

export default AgentProvider;

export const useAgent = () => {
    const res = useContext(AgentContext);
    if (res) return res;
    return null;
};
