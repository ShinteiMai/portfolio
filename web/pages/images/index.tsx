import Layout from "../../components/Layout";
import { CreateImageComponent } from "../../generated/apolloComponents";
import { ApolloContext } from "../../interfaces/ApolloContext";
import { fetchImagesQuery } from "../../graphql/user/queries/fetchImages";
import Link from "next/link";

interface ImageProps {
  id: string;
  url: string;
  filename: string;
}

interface Props {
  images: ImageProps[];
}

const Images = ({ images }: Props) => {
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
      <div>
        {images.map((image) => {
          return (
            <div key={image.id}>
              <h3>{image.filename}</h3>
              <img src={image.url} />
              <Link href={`/images/[image]`} as={`/images/${image.id}`}>
                <a>Update this image</a>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

Images.getInitialProps = async ({ query: {}, apolloClient }: ApolloContext) => {
  const images = await apolloClient.query({
    query: fetchImagesQuery,
  });
  console.log(images);

  return { images: images.data.fetchImages };
};

export default Images;
