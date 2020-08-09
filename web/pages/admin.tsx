import Layout from "../components/Layout";
import { ApolloContext } from "../interfaces/ApolloContext";
import {
  MeQuery,
  MeQueryVariables,
  CreateProjectComponent,
  GetStacksQuery,
  GetStacksQueryVariables,
} from "../generated/apolloComponents";
import { meQuery } from "../graphql/user/queries/me";
import { getStacksQuery } from "../graphql/user/queries/getStacks";

import redirect from "../lib/redirect";
import Link from "next/link";
import { Formik, Field, FieldArray } from "formik";
import { InputField } from "../components/fields/InputField";

interface Stack {
  id: string;
  name: string;
  url: string;
}

interface Props {
  stacks: Stack[];
}

const Admin = ({ stacks }: Props) => {
  return (
    <Layout title="Admin Page">
      <h1>Admin Page</h1>
      <Link href="/auth/logout">
        <a>Logout</a>
      </Link>
      <Link href="/stacks">
        <a>Stacks</a>
      </Link>
      <div>
        <h1>Create a project</h1>
        <div>
          <CreateProjectComponent>
            {(createProject) => (
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (data) => {
                  console.log(data);
                  // const response = await createProject({
                  //   variables: data
                  // });
                }}
                initialValues={{
                  title: "",
                  year: "",
                  thumbnail: "",
                  stacks: stacks,
                  links: [
                    {
                      type: "",
                      url: "",
                    },
                  ],
                }}
              >
                {({ handleSubmit, setFieldValue, values }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="title"
                      placeholder="title"
                      type="text"
                      component={InputField}
                    />
                    <Field
                      name="year"
                      placeholder="year"
                      type="text"
                      component={InputField}
                    />
                    <input
                      name="thumbnail"
                      type="file"
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          setFieldValue(
                            "thumbnail",
                            event.currentTarget.files[0]
                          );
                        }
                      }}
                    />
                    <FieldArray name="stacks">
                      {(helpers) => (
                        <div>
                          {values.stacks && values.stacks.length > 0 ? (
                            values.stacks.map((_, index) => (
                              <div key={index}>
                                <Field
                                  type="text"
                                  name={`stacks[${index}].name`}
                                  placeholder="Stack"
                                  component={InputField}
                                />
                                <Field
                                  type="text"
                                  name={`stacks[${index}].url`}
                                  placeholder="Stack URL"
                                  component={InputField}
                                />
                                <button
                                  type="button"
                                  onClick={() => helpers.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => helpers.insert(index, "")}
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => helpers.push("")}
                            >
                              Add a stack
                            </button>
                          )}
                        </div>
                      )}
                    </FieldArray>
                    <FieldArray name="links">
                      {(helpers) => (
                        <div>
                          {values.links && values.links.length > 0 ? (
                            values.links.map((_, index) => (
                              <div key={index}>
                                <Field
                                  type="text"
                                  name={`links[${index}].type`}
                                  placeholder="Link Type"
                                  component={InputField}
                                />
                                <Field
                                  type="text"
                                  name={`links[${index}].url`}
                                  placeholder="URL"
                                  component={InputField}
                                />

                                <button
                                  type="button"
                                  onClick={() => helpers.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => helpers.insert(index, "")}
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => helpers.push("")}
                            >
                              Add a link
                            </button>
                          )}
                        </div>
                      )}
                    </FieldArray>
                    <button type="submit">Submit</button>
                  </form>
                )}
              </Formik>
            )}
          </CreateProjectComponent>
        </div>
      </div>
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

  const stacks = await apolloClient.query<
    GetStacksQuery,
    GetStacksQueryVariables
  >({
    query: getStacksQuery,
  });

  return { stacks: stacks.data.getStacks };
};

export default Admin;
