import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://192.168.1.9:4000/graphql',
    cache: new InMemoryCache(),
});

export default client;
