import { gql } from "apollo-boost";

export const fetchImagesQuery = gql`
  query fetchImages {
    fetchImages {
      id
      url
      filename
    }
  }
`;
