import {
  FetchImageQuery,
  FetchImageQueryVariables,
  UpdateImageComponent,
} from "../../generated/apolloComponents";
import { ApolloContext } from "../../interfaces/ApolloContext";
import { fetchImageQuery } from "../../graphql/user/queries/fetchImage";
import { Formik } from "formik";

interface ImageProps {
  id: string;
  url: string;
  filename: string;
}

interface Props {
  image: ImageProps;
}

const Image = ({ image }: Props) => {
  return (
    <div key={image.id}>
      <h1>Update Image {image.filename}</h1>
      <img src={image.url} />
      <div>
        <UpdateImageComponent>
          {(updateImage) => (
            <Formik
              onSubmit={async (values) => {
                await updateImage({
                  variables: {
                    id: image.id,
                    image: values.imageFile,
                  },
                });
              }}
              initialValues={{
                imageFile: null,
              }}
            >
              {({ setFieldValue, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    name="imageFile"
                    type="file"
                    onChange={async ({ target: { validity, files } }) => {
                      if (validity.valid && files) {
                        try {
                          setFieldValue("imageFile", files[0]);
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    }}
                  />
                  <button type="submit">Update</button>
                </form>
              )}
            </Formik>
          )}
        </UpdateImageComponent>
      </div>
    </div>
  );
};

Image.getInitialProps = async ({
  query: { image },
  apolloClient,
}: ApolloContext) => {
  const fetchedImage = await apolloClient.query<
    FetchImageQuery,
    FetchImageQueryVariables
  >({
    query: fetchImageQuery,
    variables: {
      id: image as string,
    },
  });
  console.log(fetchedImage.data.fetchImage);
  return {
    image: fetchedImage.data.fetchImage,
  };
};

export default Image;
