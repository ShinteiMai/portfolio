import { gql } from "apollo-boost";

export const getStacksQuery = gql`
  query getStacks {
    getStacks {
      id
      name
      url
    }
  }
`;
