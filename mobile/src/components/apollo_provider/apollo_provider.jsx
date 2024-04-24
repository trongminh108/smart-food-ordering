import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo-client/apollo-client';

function Providers({ children }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Providers;
