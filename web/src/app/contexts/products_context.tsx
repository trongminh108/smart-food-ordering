import { createContext, useContext, useEffect, useState } from 'react';

const ProductsContext = createContext<any>(null);

import React from 'react';
import { CHILDREN } from '../constants/interfaces';
import { useQuery, useSubscription } from '@apollo/client';
import { getProductsByAgentID } from '@/app/apollo-client/queries/products';
import { useAuth } from './auth_context';
import {
    pubAgentStatusOrder,
    pubNewOrder,
} from '../apollo-client/subscriptions/orders';

function ProductsProvider({ children }: CHILDREN) {
    const { authState } = useAuth();
    const {
        loading,
        data: dataProducts,
        error,
    } = useQuery(getProductsByAgentID, {
        variables: {
            idAgent: authState.user.agent.id,
        },
    });

    useEffect(() => {
        if (dataProducts) {
            setProducts(dataProducts.productsByAgentID);
        }
    }, [dataProducts]);

    const [products, setProducts] = useState<any>(null);

    const value = {
        products: { value: products, setState: setProducts },
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsProvider;

export const useProducts = () => {
    const res = useContext(ProductsContext);
    if (res) {
        console.log('hello');
        return res;
    }
    console.log('hi');

    return null;
};
