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
import { getProductsByAgentID } from '../apollo-client/queries/products';
import { Container } from 'react-bootstrap';

function AgentProvider({ children }: CHILDREN) {
    const { authState } = useAuth();
    const { data: dataOrders } = useQuery(getOrdersByAgentID, {
        variables: {
            ordersByAgentIdId: authState.user.agent.id,
        },
    });
    const { data: dataProducts } = useQuery(getProductsByAgentID, {
        variables: {
            idAgent: authState.user.agent.id,
        },
    });

    useEffect(() => {
        if (dataOrders) setOrders([...dataOrders.ordersByAgentID]);
    }, [dataOrders]);

    useEffect(() => {
        if (dataProducts) {
            const products = [...dataProducts.productsByAgentID];
            setProducts(products);
            const categories = products.map((product) => ({
                id: product.id_category,
                name: product.category.name,
            }));
            const res = categories.filter((value, index, self) => {
                return index === self.findIndex((o) => o.id === value.id);
            });

            setCategories(res);
        }
    }, [dataProducts]);

    const [orders, setOrders] = useState<any>(null);
    const [products, setProducts] = useState<any>(null);
    const [categories, setCategories] = useState<any>(null);
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
        products: { value: products, setState: setProducts },
        categories: { value: categories, setState: setCategories },
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
