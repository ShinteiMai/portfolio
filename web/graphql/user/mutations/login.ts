import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
