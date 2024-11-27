import { useQuery } from "@apollo/client";
import { GET_POST } from "../graphql/queries/post.graphql";
import { Post } from "../types";

type Variables = {
  id: string;
};

type PostQuery = {
  __typename?: "Query";
  post: Post;
};

export const useGetPostQuery = (variables: Variables) => {
  return useQuery<PostQuery, Variables>(GET_POST, {
    variables,
  });
};
