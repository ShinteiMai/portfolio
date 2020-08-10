import { gql } from "apollo-boost";

export const fetchImageQuery = gql`
  query fetchImage($id: String!) {
    fetchImage(id: $id) {
      id
      url
      filename
    }
  }
`;
