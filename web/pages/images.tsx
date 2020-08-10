import React from "react";
import Layout from "../components/Layout";
import { CreateImageComponent } from "../generated/apolloComponents";
// import { Formik } from "formik";
// import { CreateImageComponent } from "../generated/apolloComponents";

const Images: React.FC = () => {
  // const apolloClient = useApolloClient();

  // const onChange = async ({
  //   target: {
  //     validity,
  //     files: [file],
  //   },
  // }: any) => {
  //   if (file) {
  //     if (validity.valid) {
  //       console.log("asd");
  //       console.log(file);
  //       const response = await apolloClient.mutate<
  //         CreateImageMutation,
  //         CreateImageMutationVariables
  //       >({
  //         mutation: createImageMutation,
  //         variables: {
  //           image: file,
  //         },
  //       });
  //       console.log(response);
  //     }
  //   }
  // };

  return (
    <Layout>
      <div>
        <h1>Image CRUD</h1>
      </div>
      <div>
        <CreateImageComponent>
          {(createImage) => (
            <input
              type="file"
              id="file"
              name="file"
              required
              onChange={({
                target: {
                  validity,
                  files: [file],
                },
              }: any) => {
                if (
                  validity.valid &&
                  createImage({
                    variables: {
                      image: file,
                    },
                  }).then((response) => console.log(response))
                ) {
                }
              }}
            />
          )}
        </CreateImageComponent>
      </div>
    </Layout>
  );
};

export default Images;
