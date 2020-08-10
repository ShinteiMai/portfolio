import { gql } from "apollo-boost";

export const updateImageMutation = gql`
  mutation updateImage($id: String!, $image: Upload!) {
    updateImage(id: $id, image: $image) {
      id
      url
      filename
    }
  }
`;
