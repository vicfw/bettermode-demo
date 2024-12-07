import { Loader2 } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-500 py-3 px-2",
          className
        )}
        ref={ref}
        {...props}
      >
        {loading ? <Loader2 className="text-white animate-spin" /> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
