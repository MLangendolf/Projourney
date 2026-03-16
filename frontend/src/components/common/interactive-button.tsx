import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import type { InteractiveButtonProps } from "../../types";

export default function InteractiveButton({
  href,
  children,
  variant = "primary",
  className,
}: InteractiveButtonProps) {
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white px-9 py-4 rounded-full font-semibold shadow-lg hover:shadow-blue-500/50",
    outline: "border-2 border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white px-9 py-4 rounded-full font-semibold",
    nav: "      text-foreground border font-semibold ",
    navButton: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold",
  };

  return (
    <Link
      to={href}
      className={cn(
        "relative inline-block duration-300",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
