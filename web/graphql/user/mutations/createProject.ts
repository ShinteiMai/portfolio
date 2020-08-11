import { gql } from "apollo-boost";

export const createProjectMutation = gql`
  mutation createProject(
    $title: String!
    $year: String!
    $imageId: String!
    $stacks: [String!]!
    $links: [LinkInput!]!
  ) {
    createProject(
      title: $title
      year: $year
      imageId: $imageId
      stacks: $stacks
      links: $links
    ) {
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
