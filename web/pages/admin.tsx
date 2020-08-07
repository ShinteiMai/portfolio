import Layout from "../components/Layout";
import { ApolloContext } from "../interfaces/ApolloContext";
import { MeQuery, MeQueryVariables } from "../generated/apolloComponents";
import { meQuery } from "../graphql/user/queries/me";
import redirect from "../lib/redirect";
import Link from "next/link";

const Admin = () => {
  return (
    <Layout title="Admin Page">
      <h1>Admin Page</h1>
      <Link href="/auth/logout">
        <a>Logout</a>
      </Link>
    </Layout>
  );
};

Admin.getInitialProps = async ({
  query: {},
  apolloClient,
  ...ctx
}: ApolloContext) => {
  const response = await apolloClient.query<MeQuery, MeQueryVariables>({
    query: meQuery,
  });

  if (!response.data.me) {
    redirect(ctx, "/");
  }

  return {};
};

export default Admin;
