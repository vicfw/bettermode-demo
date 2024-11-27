import { gql } from "@apollo/client";

export const ADD_REACTION = gql`
  mutation addReaction($postId: ID!, $input: AddReactionInput!) {
    addReaction(postId: $postId, input: $input) {
      status
    }
  }
`;
