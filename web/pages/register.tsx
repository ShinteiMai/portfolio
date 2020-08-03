import React from "react";
import { Formik, Field } from "formik";
import Layout from "../components/Layout";
import { InputField } from "../components/fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";

const Register = () => {
  return (
    <Layout title="Register Page">
      <RegisterComponent>
        {(register) => (
          <Formik
            onSubmit={async (data) => {
              const response = await register({
                variables: {
                  data,
                },
              });

              console.log(response);
            }}
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="firstName"
                  placeholder="First name"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  placeholder="Last name"
                  component={InputField}
                />
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={InputField}
                />
                <Field
                  name="email"
                  placeholder="Email"
                  type="email"
                  component={InputField}
                />
                <button type="submit" />
              </form>
            )}
          </Formik>
        )}
      </RegisterComponent>
    </Layout>
  );
};

export default Register;
