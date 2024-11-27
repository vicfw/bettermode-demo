import { Button } from "../../../../components/Button";
import FullHeightWrapper from "../../../../components/FullHeightWrapper";
import { usePostList } from "../../hooks/usePostList";
import PostCard from "../post-card/PostCard";

const PostList = () => {
  const { get, on } = usePostList();

  if (get.loading) {
    return <FullHeightWrapper text="Loading..." />;
  }

  if (get.error) {
    return <FullHeightWrapper text="Error..." />;
  }

  if (!get.posts?.posts.nodes) {
    return <FullHeightWrapper text="No Post Found" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 ">
        {get.posts.posts &&
          get.posts.posts.nodes.map((post) => (
            <PostCard {...post} key={post.id} />
          ))}
      </div>
      {get.posts.posts.pageInfo.hasNextPage && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={on.loadMorePosts}
            loading={get.loading}
            disabled={get.loading}
          >
            <span className="text-white">Show More</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default PostList;
