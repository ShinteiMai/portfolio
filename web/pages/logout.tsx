import { ApolloContext } from "../interfaces/ApolloContext";
import { logoutMutation } from "../graphql/user/mutations/logout";
import Router from "next/router";
import redirect from "../lib/redirect";

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: ApolloContext) => {
  await apolloClient.mutate({ mutation: logoutMutation });
  await apolloClient.resetStore();

  redirect(ctx, "/login");
  return {};
};

export default Logout;
