import { gql } from "@apollo/client";
import { IMAGE_THUMBNAIL_FRAGMENT } from "../fragments/thumbnail.graphql";

export const GET_POST = gql`
  ${IMAGE_THUMBNAIL_FRAGMENT}

  query GetPost($id: ID!) {
    post(id: $id) {
      id
      slug
      title
      createdAt
      reactions {
        count
        reacted
      }
      reactionsCount
      fields {
        key
        value
      }
      thumbnail {
        ...ImageThumbnail
      }
    }
  }
`;
