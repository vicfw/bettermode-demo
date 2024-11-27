import { Link } from "react-router";
import Reaction from "../../../../components/reaction/Reaction";
import { Post } from "../../../../types";
import { cn } from "../../../../utils";
import { usePostCard } from "../../hooks/usePostCard";
import { ArrowLeft } from "lucide-react";

type PostCardProps = Post;
const PostCard = ({
  createdAt,
  slug,
  id,
  title,
  reactions,
  reactionsCount,
  fields,
}: PostCardProps) => {
  const { get, on } = usePostCard(fields);

  return (
    <Link to={`/posts/${slug}-${id}`} className="group">
      <div
        className="border border-card md:rounded-lg flex flex-col text-content-subdued  bg-surface shadow-card sm:rounded-card cursor-pointer hover:shadow transition-all ease-in-out duration-200 justify-start stretch  min-h-fit"
        ref={get.postRef}
      >
        <div className="bg-white flex flex-col gap-8 px-4 py-5 md:rounded-lg">
          {!get.isHomePage && (
            <ArrowLeft className="cursor-pointer" onClick={on.handleBack} />
          )}
          <h2 className="font-medium text-heading-2xs text-content line-clamp-3 ">
            {title}
          </h2>
          <div className="relative">
            {get.descriptionString && (
              <article
                className={cn(
                  "prose max-w-none  overflow-hidden break-words",
                  !get.isMoreContentShown && get.isHomePage && "max-h-[27rem]"
                )}
                dangerouslySetInnerHTML={{ __html: get.cleanHtml }}
              />
            )}
            {!get.isMoreContentShown && get.hasMore && get.isHomePage && (
              <div className="absolute left-0 bottom-0 w-full h-12 bg-gradient-to-b from-transparent to-[#FFFFFF]" />
            )}
          </div>
          {get.hasMore && get.isHomePage && (
            <span
              onClick={on.handleClickMore}
              className="cursor-pointer rounded-base transition duration-200 focus:outline-none focus-visible:ring text-blue-500 hover:text-blue-900"
            >
              {get.isMoreContentShown ? "See less" : " See More"}
            </span>
          )}
          <Reaction
            createdAt={createdAt}
            reactions={reactions}
            reactionsCount={reactionsCount}
            id={id}
          />
        </div>
      </div>
    </Link>
  );
};
export default PostCard;
