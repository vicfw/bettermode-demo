import { Calendar, Heart } from "lucide-react";
import { useReaction } from "./useReaction";

type ReactionProps = {
  reactionsCount: number;
  createdAt: string;
  reactions: { reacted: boolean }[];
  id: string;
};

const Reaction = ({
  createdAt,
  reactions,
  reactionsCount,
  id,
}: ReactionProps) => {
  const { on } = useReaction(id);
  return (
    <div className="flex items-center justify-between">
      <div className="text-content-subdued flex space-s-1 flex-[2]  text-neutral-500 gap-1 text-sm items-center">
        <Calendar className="w-4 h-4" />
        {on.formatDate(createdAt)}
      </div>
      <div
        onClick={(e) => on.addReactionHandler(e, reactions[0]?.reacted)}
        className="border py-2 px-3 rounded-md cursor-pointer flex items-center justify-between flex-1 max-w-[100px]"
      >
        <Heart
          fill={reactions[0]?.reacted ? "red" : "none"}
          stroke={reactions[0]?.reacted ? "red" : "black"}
        />
        <span>{reactionsCount}</span>
      </div>
    </div>
  );
};

export default Reaction;
