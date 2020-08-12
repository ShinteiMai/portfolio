import { gql } from "apollo-boost";

export const getProjectsQuery = gql`
  query getProjects {
    getProjects {
      id
      title
      year
      image {
        id
        url
        filename
      }
      links {
        id
        type
        url
      }
      stacks {
        id
        name
        url
      }
    }
  }
`;
