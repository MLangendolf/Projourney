
// src/components/common/simpleLink.tsx
import { Link, LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

// Estilos que você já tinha
const variantStyles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white px-9 py-4 rounded-full font-semibold",
  outline: "border-2 border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white px-9 py-4 rounded-full",
  nav: "text-gray-300 font-semibold hover:text-white border-b-2 border-transparent hover:border-[#00aaff]",
  navButton: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold",
};

// Props simples: todas as props de um Link + a nossa 'variant'
interface Props extends LinkProps {
  variant?: keyof typeof variantStyles;
}

export default function SimpleLink({ className, children, variant = "primary", ...props }: Props) {
  // O efeito de ripple pode ser adicionado depois se quisermos. Por agora, vamos focar na simplicidade.
  return (
    <Link className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </Link>
  );
}
