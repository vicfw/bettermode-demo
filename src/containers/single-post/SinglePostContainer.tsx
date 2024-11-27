import FullHeightWrapper from "../../components/FullHeightWrapper";
import PostCard from "../home/components/post-card/PostCard";
import { useSinglePost } from "./useSinglePost";

const SinglePostContainer = () => {
  const { get } = useSinglePost();

  if (get.loading) {
    return <FullHeightWrapper text="Loading..." />;
  }

  return (
    <section className="py-5 w-full md:w-1/2 m-auto">
      {get.post && <PostCard {...get.post} />}
    </section>
  );
};

export default SinglePostContainer;
