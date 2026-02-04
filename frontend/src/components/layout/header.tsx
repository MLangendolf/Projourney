//src/components/layout/header.tsx

import Dropdown from "../common/dropdown"
import SimpleLink from "../common/simpleLink"

{/* Header */ }
export default function Header() {
    return (
        
        <header className="sticky top-0 left-0 min-w-full h-full z-50 bg-blue-900/40 backdrop-blur-md border-b border-blue-500/30 px-3 py-2">
            <div className="flex justify-between items-center">
<div className="flex justify-between items-center">
                <img src="/image/pj1.png" alt="projourney border-" className="w-16 h-16" />
                <div className="text-2xl font-bold text-[#00aaff] ">PROJOURNEY</div>
</div>
                <nav className="flex items-center space-x-6">
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
                </nav>
            </div>
        </header>
    )
}
