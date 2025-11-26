import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ParticleBackground from "@/components/effects/particlebackground"

export default function About() {
  return (
    <main className="p-8">
      <ParticleBackground />

      <Card className="max-w-2xl mx-auto mt-10 bg-white/10 backdrop-blur text-white border-white/20">
        
        <CardHeader>
          <CardTitle>Objetivo</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p>
            Somos estudantes do IFPE – Campus Igarassu e criamos este projeto com o objetivo de melhorar a forma de estudo online, oferecendo trilhas personalizadas que tornam o aprendizado mais eficiente e direcionado.
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
  )
}
