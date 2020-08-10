import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";
import { createUploadLink } from "apollo-upload-client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

const create = (initialState: any, { getToken }: Options) => {
  const httpLink = createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
  });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.map(({ message, locations, path }) => {
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       );

  //       if (message.includes("not authenticated")) {
  //         Router.push("/login");
  //       }
  //     });
  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : "",
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
};

export default function initApollo(initialState: any, options: Options) {
  if (!isBrowser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
