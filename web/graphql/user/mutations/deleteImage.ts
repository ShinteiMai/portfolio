import { gql } from "apollo-boost";

export const deleteImageMutation = gql`
  mutation deleteImage($id: String!) {
    deleteImage(id: $id) {
      id
      url
      filename
    }
  }
`;
