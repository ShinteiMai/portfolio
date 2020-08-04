import React from "react";
import Layout from "../components/Layout";
import { LoginComponent } from "../generated/apolloComponents";
import { Formik, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import Router from "next/router";

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
