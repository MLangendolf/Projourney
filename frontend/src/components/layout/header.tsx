//src/components/layout/header.tsx

import Dropdown from "../common/dropdown"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../effects/theme-provider"
import SimpleLink from "../common/simpleLink"
import { Button } from "../ui/button"

{/* Header */ }
export default function Header() {
    const { theme, toggleTheme } = useTheme()

    // Define the dark theme color
    const darkThemeColor = 'rgba(8, 8, 20, 0.4)'

    return (
        <header className="sticky top-0 left-0 min-w-full h-full z-50 bg-blue-900/40 backdrop-blur-md border-b border-blue-500/30 pl-[75px] pr-[75px] py-2">
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <img src="/image/pj1.png" alt="projourney border-" className="w-16 h-16" />
                    <div className="text-2xl font-bold text-[#00aaff] ">PROJOURNEY</div>
                </div>
                <nav className="flex items-center space-x-6 mr-6">
                    <SimpleLink to="/cursos" variant="nav">
                        Cursos
                    </SimpleLink>
                    <SimpleLink to="/trilhas" variant="nav">
                        Trilhas
                    </SimpleLink>
                    <SimpleLink to="/sobre" variant="nav">
                        Sobre
                    </SimpleLink>
                    <Dropdown label="Login" className="text-2xl font-bold" />
                    <Button onClick={toggleTheme} variant="outline" size="icon">
                        {theme === darkThemeColor ? (
                            <Sun className="" />
                        ) : (
                            <Moon className="" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </nav>
            </div>
        </header>
    )
}

