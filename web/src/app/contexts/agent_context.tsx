import React, { createContext, useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { useQuery, useSubscription } from '@apollo/client';

import { getAllCategories } from '../apollo-client/queries/categories';
import { getOrdersByAgentID } from '../apollo-client/queries/orders';
import { getProductsByAgentID } from '../apollo-client/queries/products';
import {
    pubAgentStatusOrder,
    pubNewOrder,
} from '../apollo-client/subscriptions/orders';
import { CHILDREN } from '../constants/interfaces';
import { useAuth } from './auth_context';
import { CustomToastify } from '../modules/feature_function';
import { STATUS_PENDING } from '../constants/backend';

const AgentContext = createContext<any>(null);

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
    const { data: dataAllCategories } = useQuery(getAllCategories);

    const [orders, setOrders] = useState<any>(null);
    const [products, setProducts] = useState<any>(null);
    const [categories, setCategories] = useState<any>(null);
    const [allCategories, setAllCategories] = useState<any>(null);
    const [statusOrder, setStatusOrder] = useState(null);

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

    useEffect(() => {
        if (dataAllCategories) {
            const newCates = [...dataAllCategories.categories];
            newCates.sort((a: any, b: any) => {
                const na = a.name,
                    nb = b.name;
                if (na > nb) return 1;
                if (na < nb) return -1;
                return 1;
            });
            setAllCategories(newCates);
        }
    }, [dataAllCategories]);

    useSubscription(pubAgentStatusOrder, {
        onData: ({ data }) => {
            const newOrder = data.data.pubAgentStatusOrder;
            if (newOrder.status === STATUS_PENDING) {
                setOrders((prev: any) => {
                    return [newOrder, ...prev];
                });
                CustomToastify(`Có đơn mới từ ${newOrder.recipient}`);
            } else {
                console.log('[AGENT CONTEXT]', newOrder);

                setOrders((prev: any) => {
                    return prev.map((order: any) => {
                        if (order.id === newOrder.id) return newOrder;
                        return order;
                    });
                });
            }
        },
        variables: {
            idAgent: authState.id_agent,
        },
    });

    const value = {
        orders: { value: orders, setState: setOrders },
        products: { value: products, setState: setProducts },
        categories: { value: categories, setState: setCategories },
        allCategories: { value: allCategories, setState: setAllCategories },
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
