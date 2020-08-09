import { gql } from "apollo-boost";

export const createStackMutation = gql`
  mutation createStack($name: String!, $url: String!) {
    createStack(name: $name, url: $url) {
      id
      name
      url
    }
  }
`;
