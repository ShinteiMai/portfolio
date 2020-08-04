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
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
              try {
                const response = await register({
                  variables: {
                    data,
                  },
                });
                console.log(response);
              } catch (err) {
                const errors: { [key: string]: string } = {};

                err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
                  (validationErr: any) => {
                    Object.values(validationErr.constraints).forEach(
                      (message: any) => {
                        errors[validationErr.property] = message;
                      }
                    );
                  }
                );

                setErrors(errors);
              }
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
