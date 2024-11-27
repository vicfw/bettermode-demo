import { useMutation, ApolloCache } from "@apollo/client";
import { ADD_REACTION } from "../graphql/mutation/addReaction.graphql";
import { GET_POSTS } from "../graphql/queries/posts.graphql";
import { Post } from "../types";

export const useAddReactionMutation = ({ postId }: { postId: string }) => {
  const [addReaction, { loading }] = useMutation(ADD_REACTION, {
    variables: {
      postId,
      input: {
        reaction: "heart",
        overrideSingleChoiceReactions: true,
      },
    },
    // Provides an optimistic response for the `addReaction` mutation, which sets the `status` to `"SUCCESS"` before the actual mutation completes. This allows for a smoother user experience by immediately updating the UI to reflect the reaction being added, before the server-side update is complete.
    optimisticResponse: {
      __typename: "Mutation",
      addReaction: {
        __typename: "AddReactionPayload",
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
        // Find the post in the cached data
        const updatedPosts = existingPosts.posts.nodes.map((post: Post) => {
          if (post.id === postId) {
            // Update the reactions for the specific post
            return {
              ...post,
              reactions: [
                ...post.reactions,
                {
                  reaction: "heart",
                  count: 1,
                  reacted: true,
                },
              ],
              reactionsCount: post.reactionsCount + 1,
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

  // Handles the addition of a reaction to a post. This function is called when the user interacts with the UI to add a reaction to a post.
  const handleAddReaction = () => {
    addReaction();
  };

  return {
    handleAddReaction,
    loading,
  };
};
