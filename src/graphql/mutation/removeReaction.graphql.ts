import { gql } from "@apollo/client";

export const REMOVE_REACTION = gql`
  mutation removeReaction($postId: ID!, $reaction: String!) {
    removeReaction(postId: $postId, reaction: $reaction) {
      status
    }
  }
`;
