import { cn } from "../utils";

type CardProps = {
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLDialogElement>;

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-line-subdued bg-card-background text-card-foreground shadow-card flex w-full max-w-2xl flex-col items-center px-6 pt-7 sm:px-6 bg-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
