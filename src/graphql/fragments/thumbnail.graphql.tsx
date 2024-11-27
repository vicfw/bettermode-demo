import { gql } from "@apollo/client";

export const IMAGE_THUMBNAIL_FRAGMENT = gql`
  fragment ImageThumbnail on Image {
    __typename
    url
    width
    height
  }
`;
