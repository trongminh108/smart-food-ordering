import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BACKEND_URL } from '../constants/backend';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
});

export default client;
