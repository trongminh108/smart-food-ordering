import { createClient } from 'graphql-ws';

import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';

import { BACKEND_IP, BACKEND_SUB, BACKEND_URL } from '../constants/backend';

const httpLink = new HttpLink({
    uri: `${BACKEND_URL}/graphql`,
});
const wsLink = new GraphQLWsLink(
    createClient({
        url: `${BACKEND_SUB}/graphql`,
    })
);
const splitLink = split(
    ({ query }: { query: any }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});
export default client;
