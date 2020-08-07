import { ApolloContext } from "../../interfaces/ApolloContext";
import { logoutMutation } from "../../graphql/user/mutations/logout";
import {
  LogoutMutation,
  LogoutMutationVariables,
} from "../../generated/apolloComponents";
import redirect from "../../lib/redirect";

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: ApolloContext) => {
  await apolloClient.mutate<LogoutMutation, LogoutMutationVariables>({
    mutation: logoutMutation,
  });
  await apolloClient.resetStore();

  redirect(ctx, "/");

  return {};
};

export default Logout;
