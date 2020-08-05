import Layout from "../../../components/Layout";
import { ChangePasswordComponent } from "../../../generated/apolloComponents";
import { Formik, Field } from "formik";
import Router from "next/router";
import { InputField } from "../../../components/fields/InputField";
import { ApolloContext } from "../../../interfaces/ApolloContext";

const ChangePassword = ({ token }: { token: string }) => {
  return (
    <Layout title="Forgot Password Page">
      <ChangePasswordComponent>
        {(changePassword) => (
          <Formik
            onSubmit={async (data) => {
              const response = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token: token,
                  },
                },
              });
              console.log(response);
              Router.push("/");
            }}
            initialValues={{
              password: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />

                <button type="submit">change password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({ query: { token } }: ApolloContext) => {
  return {
    token,
  };
};

export default ChangePassword;
