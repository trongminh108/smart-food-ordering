import { View, Text } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getOrdersByCondition } from '../apollo-client/queries/orders';
import { useAuth } from './auth_context';

const DeliverContext = createContext();

const DeliverProvider = ({ children }) => {
    const { authState } = useAuth();

    const [orders, setOrders] = useState(null);

    const { data: dataOrders } = useQuery(getOrdersByCondition, {
        variables: {
            condition: {
                id_deliver: authState?.user?.deliver?.id_deliver,
            },
        },
    });

    useEffect(() => {
        if (dataOrders) {
            setOrders(dataOrders.ordersByCondition);
        }
    }, [dataOrders]);

    const value = {
        orders: { value: orders, setState: setOrders },
    };

    return (
        <DeliverContext.Provider value={value}>
            {children}
        </DeliverContext.Provider>
    );
};

export const useDeliver = () => {
    return useContext(DeliverContext);
};

export default DeliverProvider;
