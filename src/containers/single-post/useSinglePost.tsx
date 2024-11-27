import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router";
import { useGetPostQuery } from "../../hooks/GetPostQuery";

export const useSinglePost = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const splittedPostId = postId?.split("-");
  const id = postId?.split("-")[splittedPostId!.length - 1];

  const { data: post, loading, error } = useGetPostQuery({ id: id! });

  // Check if post is null or not found
  if (error) {
    navigate("/404"); // Redirect to 404 if post is not found
    return { get: {}, on: {} };
  }

  const descriptionString = post?.post.fields
    .find((field) => field.key === "content")
    ?.value.replace(/^"|"$/g, "");

  // sanitize html
  const cleanHtml = DOMPurify.sanitize(descriptionString || "");

  const handleBack = () => {
    navigate(-1);
  };

  return {
    get: { post: post?.post, cleanHtml, descriptionString, loading },
    on: { handleBack },
  };
};
