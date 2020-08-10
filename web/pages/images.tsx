import Layout from "../components/Layout";
import { CreateImageComponent } from "../generated/apolloComponents";
import { ApolloContext } from "../interfaces/ApolloContext";
import { fetchImagesQuery } from "../graphql/user/queries/fetchImages";
// import { Formik } from "formik";

const Images = () => {
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

Images.getInitialProps = async ({
  query: {},
  apolloClient,
  ...ctx
}: ApolloContext) => {
  const images = await apolloClient.query({
    query: fetchImagesQuery,
  });
};

export default Images;
