import { useGetPostsQuery } from "../../../hooks/GetPostsQuery";

const LIMIT = 8;

export const usePostList = () => {
  const {
    data: posts,
    loading,
    error,
    loadMorePosts,
  } = useGetPostsQuery({
    limit: LIMIT,
    orderByString: "publishedAt",
    reverse: true,
  });

  return { get: { posts, loading, error }, on: { loadMorePosts } };
};
