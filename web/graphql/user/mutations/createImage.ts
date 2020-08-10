import gql from "graphql-tag";

export const createImageMutation = gql`
  mutation createImage($image: Upload!) {
    createImage(image: $image) {
      id
      url
      filename
    }
  }
`;
