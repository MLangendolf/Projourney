import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

type DropdownProps = {
  label: string;
};

export default function Dropdown({ label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="text-white hover:text-cyan-400"
      >
        {label}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-blue-900 border rounded-md shadow-lg">
          <div className="flex w-full items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-900/80 hover:bg-green-800">
            Login
          </div>
          <button
            onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-900/80 hover:bg-red-800">
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

