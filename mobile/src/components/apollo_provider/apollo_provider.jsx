import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../graphql-client/apollo-client';

function Providers({ children }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Providers;
