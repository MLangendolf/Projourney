import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import ParticleBackground from "@/components/effects/particlebackground"

export default function About() {
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <ParticleBackground />

      <Card className="card1">

        <CardHeader>
          <CardTitle>Objetivo</CardTitle>
        </CardHeader>

        <CardContent className="">
          <p>
            Somos estudantes do IFPE – Campus Igarassu e criamos este projeto com o objetivo de melhorar a forma de estudo online, oferecendo trilhas personalizadas que tornam o aprendizado mais eficiente e direcionado.
          </p>

          <h2 className="textCard2">Integrantes</h2>

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
