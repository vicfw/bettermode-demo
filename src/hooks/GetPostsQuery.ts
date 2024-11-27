import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries/posts.graphql.tsx";
import { Post } from "../types.ts";

type Variables = {
  limit: number;
  postTypeIds?: string[];
  after?: string; // Add `after` for cursor-based pagination
  orderByString?: string;
  reverse?: boolean;
};

type PostsQuery = {
  __typename?: "Query";
  posts: {
    nodes: Array<Post>;
    totalCount: number;
    pageInfo: {
      endCursor: string | null;
      hasNextPage: boolean;
    };
  };
};

/**
 * A custom React hook that fetches posts using the GraphQL `GET_POSTS` query.
 *
 * @param variables - An object containing the query variables, such as `limit`, `postTypeIds`, `after`, `orderByString`, and `reverse`.
 * @returns An object containing the fetched data, loading state, error state, and a function to fetch more posts.
 */
export const useGetPostsQuery = (variables: Variables) => {
  const { data, loading, error, fetchMore } = useQuery<PostsQuery, Variables>(
    GET_POSTS,
    { variables }
  );

  /**
   * Fetches the next page of posts by using the `endCursor` from the current page's `pageInfo`.
   * This function is called when the user scrolls to the bottom of the page and more posts are needed.
   */
  const loadMorePosts = () => {
    if (data?.posts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          ...variables,
          after: data.posts.pageInfo.endCursor, // Use the cursor for the next page
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;

          return {
            ...prevResult,
            posts: {
              ...prevResult.posts,
              nodes: [
                ...prevResult.posts.nodes,
                ...fetchMoreResult.posts.nodes,
              ],
              pageInfo: fetchMoreResult.posts.pageInfo,
            },
          };
        },
      });
    }
  };

  return { data, loading, error, loadMorePosts };
};
