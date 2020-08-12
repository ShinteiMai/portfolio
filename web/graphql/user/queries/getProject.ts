import { gql } from "apollo-boost";

export const getProject = gql`
  query getProject($id: String!) {
    getProject(id: $id) {
      id
      title
      year
      image {
        id
        filename
        url
      }
      stacks {
        id
        name
        url
      }
      links {
        id
        type
        url
      }
    }
  }
`;
