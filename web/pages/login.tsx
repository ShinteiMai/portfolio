import React from "react";
import Layout from "../components/Layout";
import { LoginComponent, MeQuery } from "../generated/apolloComponents";
import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import Router from "next/router";
import { meQuery } from "../graphql/user/queries/me";

const Login = () => {
  return (
    <Layout title="Login Page">
      <LoginComponent>
        {(login) => (
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              // const errors: { [key: string]: string } = {};
              const response = await login({
                variables: data,
                update: (cache, { data }) => {
                  if (!data || !data.login) {
                    return;
                  }

                  cache.writeQuery<MeQuery>({
                    query: meQuery,
                    data: {
                      __typename: "Query",
                      me: data.login,
                    },
                  });
                },
              });
              console.log(response);
              if (response && response.data && !response.data.login) {
                setErrors({
                  email: "Invalid login",
                });
                return;
              }

              Router.push("/");
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="email"
                  placeholder="email"
                  type="email"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={InputField}
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </Formik>
        )}
      </LoginComponent>
    </Layout>
  );
};

export default Login;
