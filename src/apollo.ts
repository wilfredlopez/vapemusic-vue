import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { APOLLO_HTTP_URI } from "./config";

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: APOLLO_HTTP_URI
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
