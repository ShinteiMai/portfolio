import { NextPageContext } from "next";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export interface ApolloContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
