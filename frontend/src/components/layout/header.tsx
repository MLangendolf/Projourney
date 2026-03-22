//src/components/layout/header.tsx

import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "../effects/theme-provider"
import SimpleLink from "../common/simpleLink"
import { Button } from "../ui/button"

{/* Header */ }
export default function Header() {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="header">

            <div className="divCard">
                <img src="/image/pj1.png" alt="projourney logo" className="w-16 h-16" />
                <div className="title">PROJOURNEY</div>
            </div>
            <nav className="divCard">
                <SimpleLink to="/cursos" variant="navLink">
                    Cursos
                </SimpleLink>
                <SimpleLink to="/trilhas" variant="navLink">
                    Trilhas
                </SimpleLink>
                <SimpleLink to="/sobre" variant="navLink">
                    Sobre
                </SimpleLink>
                <Button onClick={toggleTheme} variant="ghost" size="icon">
                    {theme === 'dark' ? (
                        <Sun />
                    ) : (
                        <Moon />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </nav>

        </header>
    )
}

