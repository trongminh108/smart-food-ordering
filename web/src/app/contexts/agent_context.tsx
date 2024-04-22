import { createContext, useContext, useEffect, useState } from 'react';

const AgentContext = createContext<any>(null);

import React from 'react';
import { CHILDREN } from '../constants/interfaces';
import { useQuery, useSubscription } from '@apollo/client';
import { getOrdersByAgentID } from '../apollo-client/queries/orders';
import { useAuth } from './auth_context';
import {
    pubAgentStatusOrder,
    pubNewOrder,
} from '../apollo-client/subscriptions/orders';

function AgentProvider({ children }: CHILDREN) {
    const { authState } = useAuth();
    const {
        loading: loadingOrders,
        data: dataOrders,
        error,
    } = useQuery(getOrdersByAgentID, {
        variables: {
            ordersByAgentIdId: authState.user.agent.id,
        },
    });

    useEffect(() => {
        if (dataOrders) setOrders(dataOrders.ordersByAgentID);
    }, [dataOrders]);

    const [orders, setOrders] = useState<any>(null);
    const [statusOrder, setStatusOrder] = useState(null);

    useSubscription(pubNewOrder, {
        onData: ({ data }) => {
            setOrders((prev: any) => {
                return [data.data.pubNewOrder, ...prev];
            });
        },
        variables: {
            idAgent: authState.id_agent,
        },
    });

    useSubscription(pubAgentStatusOrder, {
        onData: ({ data }) => {
            const newOrder = data.data.pubAgentStatusOrder;
            setOrders((prev: any) => {
                prev.map((order: any) => {
                    if (order.id === newOrder.id) return newOrder;
                    return order;
                });
            });
        },
        variables: {
            idAgent: authState.id_agent,
        },
    });

    const value = {
        orders: { value: orders, setState: setOrders },
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
