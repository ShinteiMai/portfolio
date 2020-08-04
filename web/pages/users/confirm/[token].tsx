import Layout from "../../../components/Layout";
// import { GetStaticPaths } from "next";
import { ApolloContext } from "../../../interfaces/ApolloContext";
import {
  ConfirmUserMutation,
  ConfirmUserMutationVariables,
} from "../../../generated/apolloComponents";
import { confirmUserMutation } from "../../../graphql/user/mutations/confirmUser";
import redirect from "../../../lib/redirect";

const Confirm = () => {
  return (
    <Layout>
      <div>hi</div>
    </Layout>
  );
};

export default Confirm;

Confirm.getInitialProps = async ({
  query: { token },
  apolloClient,
  ...ctx
}: ApolloContext) => {
  if (!token) return {};

  await apolloClient.mutate<ConfirmUserMutation, ConfirmUserMutationVariables>({
    mutation: confirmUserMutation,
    variables: {
      token: token as string,
    },
  });

  redirect(ctx, "/login");

  return {};
};
