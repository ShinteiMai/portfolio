import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import Layout from "../components/Layout";
import {
  ForgotPasswordComponent,
  ChangePasswordComponent,
} from "../generated/apolloComponents";
import { InputField } from "../components/fields/InputField";

const ForgotPassword = () => {
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
                    token: "",
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

export default ForgotPassword;
