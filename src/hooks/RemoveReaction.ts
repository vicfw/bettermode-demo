import { ApolloCache, useMutation } from "@apollo/client";
import { REMOVE_REACTION } from "../graphql/mutation/removeReaction.graphql";
import { GET_POSTS } from "../graphql/queries/posts.graphql";
import { Post } from "../types";

export const useRemoveReactionMutation = ({ postId }: { postId: string }) => {
  const [removeReaction, { loading }] = useMutation(REMOVE_REACTION, {
    variables: {
      postId,
      reaction: "heart",
    },
    optimisticResponse: {
      __typename: "Mutation",
      removeReaction: {
        __typename: "RemoveReactionPayload",
        status: "SUCCESS",
      },
    },
    update: (cache: ApolloCache<unknown>) => {
      // Read the query from the cache
      const existingPosts = cache.readQuery<{ posts: { nodes: Post[] } }>({
        query: GET_POSTS,
        variables: { limit: 8, orderByString: "publishedAt", reverse: true },
      });

      if (existingPosts && existingPosts.posts && existingPosts.posts.nodes) {
        // Filter the post in the cached data
        const updatedPosts = existingPosts.posts.nodes.map((post: Post) => {
          if (post.id === postId) {
            // Update the reactions for the specific post
            return {
              ...post,
              reactions: [],
              reactionsCount: post.reactionsCount - 1,
            };
          }
          return post;
        });

        // Write the updated data back to the cache
        cache.writeQuery<{ posts: { nodes: Post[] } }>({
          query: GET_POSTS,
          data: {
            posts: {
              ...existingPosts.posts,
              nodes: updatedPosts,
            },
          },
          variables: { limit: 8 },
        });
      }
    },
  });

  // Handles the removal of a reaction from a post.
  const handleRemoveReaction = () => {
    removeReaction();
  };

  return {
    handleRemoveReaction,
    loading,
  };
};
