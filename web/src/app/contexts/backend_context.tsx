'use client';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from '@/app/apollo-client/client';

function BackendProvider({ children }: { children: React.ReactNode }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default BackendProvider;
