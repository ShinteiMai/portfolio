import Layout from "../components/Layout";
import { Formik, FieldArray, Field } from "formik";
import { InputField } from "../components/fields/InputField";
import { CreateStackComponent } from "../generated/apolloComponents";

const Stacks = () => {
  return (
    <Layout>
      <h1>Stacks</h1>
      <div>
        <CreateStackComponent>
          {(createStack) => (
            <Formik
              onSubmit={async (data) => {
                console.log(data.stacks);
                const responses = [];
                for await (let stack of data.stacks) {
                  responses.push(
                    await createStack({
                      variables: stack,
                    })
                  );
                }
                console.log(responses);
                // await createStack({
                //   variables: data,
                // });
              }}
              initialValues={{
                stacks: [
                  {
                    name: "",
                    url: "",
                  },
                ],
              }}
            >
              {({ values, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
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
                  <button type="submit">Add new Stacks</button>
                </form>
              )}
            </Formik>
          )}
        </CreateStackComponent>
      </div>
    </Layout>
  );
};

export default Stacks;
