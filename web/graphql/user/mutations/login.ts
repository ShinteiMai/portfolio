import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      id
      username
    }
  }
`;
