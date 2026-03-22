

import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import type { InteractiveButtonProps } from "../../types";

export default function InteractiveButton({
  href,
  children,
  variant = "primary",
  className,
  as = "a", // Default to rendering an anchor tag

}: InteractiveButtonProps & { as?: "a" | "button"; type?: string }) {
  const variantStyles = {
    primary: "buttonPrimary",
    outline: "buttonOutline",
    navLink: "buttonLink",
    navButton: "buttonNav",
  };

  const commonClasses = "relative inline-block duration-300";

  if (as === "button") {
    return (
      <button
        className={cn(commonClasses, variantStyles[variant], className)}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={href}
      // type={href} // This prop is not valid for Link, removed
      className={cn(commonClasses, variantStyles[variant], className)}
    >
      {children}
    </Link>
  );
}
