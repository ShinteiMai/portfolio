import Layout from "../../components/Layout";
import { ApolloContext } from "../../interfaces/ApolloContext";
import {
  MeQuery,
  MeQueryVariables,
  CreateProjectComponent,
  GetStacksQuery,
  GetStacksQueryVariables,
  CreateImageComponent,
  DeleteImageMutation,
  DeleteImageMutationVariables,
  GetProjectsQueryVariables,
  GetProjectsQuery,
  Project,
} from "../../generated/apolloComponents";
import { meQuery } from "../../graphql/user/queries/me";
import { getStacksQuery } from "../../graphql/user/queries/getStacks";

import redirect from "../../lib/redirect";
import Link from "next/link";
import { Formik, Field, FieldArray } from "formik";
import { InputField } from "../../components/fields/InputField";
import { useState, useEffect, useRef } from "react";
import { useApolloClient } from "react-apollo";
import { deleteImageMutation } from "../../graphql/user/mutations/deleteImage";
import { getProjectsQuery } from "../../graphql/user/queries/fetchProjects";

interface Stack {
  id: string;
  name: string;
  url: string;
}

interface Props {
  stacks: Stack[];
  projects: Project[];
}

const Admin = ({ stacks, projects }: Props) => {
  const [imageId, setImageId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const apolloClient = useApolloClient();

  const imageIdRef = useRef(imageId);
  imageIdRef.current = "";

  useEffect(() => {
    return () => {
      if (imageIdRef.current && !isSubmitted) {
        deleteImage();
      }
    };
  }, []);

  const deleteImage = () => {
    apolloClient.mutate<DeleteImageMutation, DeleteImageMutationVariables>({
      mutation: deleteImageMutation,
      variables: {
        id: imageIdRef.current,
      },
    });
  };

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
                  const response = await createProject({
                    variables: {
                      ...data,
                      imageId: imageIdRef.current,
                    },
                  });
                  setIsSubmitted(true);
                  console.log(response);
                }}
                initialValues={{
                  title: "",
                  year: "",
                  stacks: [],
                  links: [
                    {
                      type: "",
                      url: "",
                    },
                  ],
                }}
              >
                {({ handleSubmit, values }) => (
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
                    <CreateImageComponent>
                      {(createImage) => (
                        <input
                          name="thumbnail"
                          type="file"
                          onChange={async ({
                            target: {
                              validity,
                              files: [file],
                            },
                          }: any) => {
                            if (validity.valid && file) {
                              try {
                                const response = await createImage({
                                  variables: {
                                    image: file,
                                  },
                                });
                                if (
                                  response.data &&
                                  response.data.createImage
                                ) {
                                  setImageId(response.data.createImage.id);
                                  imageIdRef.current =
                                    response.data.createImage.id;
                                  window.addEventListener(
                                    "beforeunload",
                                    deleteImage
                                  );
                                }
                              } catch (err) {
                                console.log(err);
                              }
                              // setFieldValue("thumbnail", files[0]);
                            }
                          }}
                        />
                      )}
                    </CreateImageComponent>
                    <div>
                      <div className="label">
                        Select the stacks that are used in this project
                      </div>
                      {stacks.map((stack) => {
                        return (
                          <label key={stack.id}>
                            <Field
                              type="checkbox"
                              name="stacks"
                              value={stack.id}
                            />
                            {stack.name}
                          </label>
                        );
                      })}
                    </div>
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
                                />
                                <Field
                                  type="text"
                                  name={`links[${index}].url`}
                                  placeholder="URL"
                                />

                                <button
                                  type="button"
                                  onClick={() => helpers.remove(index)}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    helpers.insert(index, {
                                      type: "",
                                      url: "",
                                    })
                                  }
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
        <div>
          <h1>List of Projects</h1>
          <div>
            {projects.map((project) => {
              return (
                <div key={project.id}>
                  <Link href="/admin/[projectId]" as={`/admin/${project.id}`}>
                    <h2>{project.title}</h2>
                  </Link>
                  <p>{project.year}</p>
                  <div>
                    {project.stacks.map((stack) => (
                      <a href={stack.url} key={stack.id}>
                        {stack.name}
                      </a>
                    ))}
                  </div>
                  <div>
                    {project.links.map((link) => (
                      <a href={link.url} key={link.id}>
                        {link.type}
                      </a>
                    ))}
                  </div>
                  <img src={project.image.url} alt={project.image.filename} />
                </div>
              );
            })}
          </div>
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

  const projects = await apolloClient.query<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >({
    query: getProjectsQuery,
  });
  console.log(projects);

  return { stacks: stacks.data.getStacks, projects: projects.data.getProjects };
};

export default Admin;
