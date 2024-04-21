import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BACKEND_IP, BACKEND_URL } from '../constants/backend';
const client = new ApolloClient({
    uri: `${BACKEND_URL}/graphql`,
    cache: new InMemoryCache(),
});
export default client;
