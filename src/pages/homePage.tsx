// src/app/homePage.tsx

import type { JSX } from "react/jsx-runtime"
import ParticleBackground from "@/components/effects/particlebackground"
import SimpleLink from "../components/common/simpleLink"

export default function HomePage(): JSX.Element {
    return (
        <body className=" text-white font-['Poppins',Arial,sans-serif]">
            <ParticleBackground /> 
                {/* Header */}
                <header className="sticky top-0 z-50 bg-blue-900/40 backdrop-blur-md border-b border-blue-500/30 px-10 py-4">
                    <div className="flex justify-between items-center">
                        <img src="/image/pj1.png" alt="projourney border-" className="w-24 h-24 " />
                        <div className="text-3xl font-bold text-[#00aaff] ">PROJOURNEY</div>
                        <nav className="flex items-center space-x-6">
                            <SimpleLink to="/cursos" variant="nav">
                                Cursos
                            </SimpleLink>
                            <SimpleLink to="/trilhas" variant="nav">
                                Trilhas
                            </SimpleLink>
                            <SimpleLink to="#" variant="nav">
                                Sobre
                            </SimpleLink>
                            <SimpleLink to="/login" variant="navButton">
                                Entrar
                            </SimpleLink>
                            <SimpleLink to="/cadastrar" variant="navButton">
                                Cadastrar
                            </SimpleLink>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className=" m-[10%]">
                    <section className=" relative z-10 flex flex-col items-center justify-center  px-8 py-24 text-center ">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
                            Prepare-se para sua formação de forma inteligente
                        </h1>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                            Milhares de vídeos pra você que ama tecnologia, vídeo aulas grátis e muito mais.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <SimpleLink to="Login" variant="outline">
                               Comece agora. Tudo de forma gratuita!
                            </SimpleLink>
                        </div>
                    </section>
                </main>
        </body>
    )
}

