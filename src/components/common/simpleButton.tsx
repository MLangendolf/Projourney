
// src/components/common/simpleButton.tsx
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white px-9 py-4 rounded-full font-semibold",
  outline: "border-2 border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white px-9 py-4 rounded-full",
  navButton: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold",
};

// Props simples: todas as props de um botão + a nova 'variant'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
}

export default function simpleButton({ className, children, variant = "primary", ...props }: Props) {
  return (
    <button className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </button>
  );
}
