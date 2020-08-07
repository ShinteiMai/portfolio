import React from "react";
import styled from "styled-components";

import Layout from "../../components/Layout";
import { LoginComponent } from "../../generated/apolloComponents";
import { Formik, Field } from "formik";
import Router from "next/router";
import { InputField } from "../../components/fields/InputField";

const Title = styled.h1`
  margin-bottom: 3.2rem;
`;

const Login: React.FC = () => {
  return (
    <Layout title="Login">
      <Title>Login</Title>
      <div>
        <LoginComponent>
          {(login) => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (data, { setErrors }) => {
                const response = await login({
                  variables: data,
                });

                if (response && response.data && !response.data.login) {
                  setErrors({
                    username: "Authentication failed",
                  });
                  return;
                }

                Router.push("/admin");
              }}
              initialValues={{
                username: "",
                password: "",
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="username"
                    placeholder="Username"
                    type="text"
                    component={InputField}
                  />
                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <button type="submit">Login</button>
                </form>
              )}
            </Formik>
          )}
        </LoginComponent>
      </div>
    </Layout>
  );
};

export default Login;
