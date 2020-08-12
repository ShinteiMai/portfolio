import { gql } from "apollo-boost";

export const deleteProjectMutation = gql`
  mutation deleteProject($id: String!) {
    deleteProject(id: $id) {
      id
      title
      year
      image {
        id
        url
        filename
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
