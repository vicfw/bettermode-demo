import { useAddReactionMutation } from "../../hooks/AddReactionMutation";
import { useRemoveReactionMutation } from "../../hooks/RemoveReaction";

export const useReaction = (id: string) => {
  // add reaction
  const { handleAddReaction } = useAddReactionMutation({
    postId: id,
  });

  // remove reaction
  const { handleRemoveReaction } = useRemoveReactionMutation({
    postId: id,
  });

  // format date
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // add reaction handler
  const addReactionHandler = async (
    e: React.MouseEvent<HTMLDivElement>,
    isReacted: boolean
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (isReacted) {
      handleRemoveReaction();
      return;
    }
    handleAddReaction();
  };

  return { get: {}, on: { formatDate, addReactionHandler } };
};
