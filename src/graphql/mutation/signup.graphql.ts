import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation AuthFormValidateEmailMutation($input: RequestGlobalTokenInput!) {
    validateEmail(input: $input) {
      valid
      suggestion
    }
  }
`;
