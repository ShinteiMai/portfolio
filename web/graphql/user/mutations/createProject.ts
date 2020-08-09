import { gql } from "apollo-boost";

export const createProjectMutation = gql`
  mutation createProject(
    $title: String!
    $year: String!
    $thumbnail: Upload!
    $stacks: [String!]!
    $links: [LinkInput!]!
  ) {
    createProject(
      title: $title
      year: $year
      thumbnail: $thumbnail
      stacks: $stacks
      links: $links
    ) {
      id
      title
      year
      thumbnailUrl
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
