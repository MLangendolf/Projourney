import React from 'react';
import SimpleLink from "../components/common/simpleLink";
import ParticleBackground from '../components/effects/particlebackground';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  return (
    <>
      <header className="sticky top-0 bg-blue-900/40 backdrop-blur-md border-b border-blue-500/30 px-10 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Sobre</h1>

          <nav className="flex items-center space-x-6">
            <SimpleLink
              to={localStorage.getItem('usuarioLogado') ? "/perfil" : "/"}
              variant="nav"
            >
              Início
            </SimpleLink>
          </nav>
        </div>
      </header>

      <main className="p-8">
        <ParticleBackground />

        <Card className="max-w-2xl mx-auto mt-10 bg-white/10 backdrop-blur text-white border-white/20">
          <CardHeader>
            <CardTitle>Objetivo</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p>
              Somos estudantes do IFPE – Campus Igarassu e criamos este projeto
              com o objetivo de melhorar a forma de estudo online, oferecendo
              trilhas personalizadas que tornam o aprendizado mais eficiente e direcionado.
            </p>

            <h2 className="text-xl font-semibold">Integrantes</h2>

            <ul className="list-disc list-inside">
              <li>Gabriel Henrique</li>
              <li>Cristiano</li>
              <li>Maviael</li>
              <li>Gabriel Suruba</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

