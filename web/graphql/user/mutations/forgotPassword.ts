import { gql } from "apollo-boost";

export const forgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
