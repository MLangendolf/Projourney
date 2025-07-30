

import { useState } from "react"
import type React from "react"
import { Button } from  "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { ArrowLeft, Code, Database, Shield, Smartphone, Globe, Cpu, Brain, Zap } from "lucide-react"
 import {Link} from "react-router-dom"  // Mudança do 'next/link' para o 'react-router-dom"
import type { TechArea, ExperienceLevel, FormData } from "../../types" // "@/types"
import type { JSX } from "react/jsx-runtime"

const techAreas: TechArea[] = [
  { id: "frontend", label: "Desenvolvimento Frontend", icon: Globe },
  { id: "backend", label: "Desenvolvimento Backend", icon: Database },
  { id: "mobile", label: "Desenvolvimento Mobile", icon: Smartphone },
  { id: "security", label: "Segurança da Informação", icon: Shield },
  { id: "data", label: "Ciência de Dados", icon: Brain },
  { id: "devops", label: "DevOps e Cloud", icon: Cpu },
  { id: "ai", label: "Inteligência Artificial", icon: Zap },
  { id: "fullstack", label: "Desenvolvimento Full Stack", icon: Code },
]

const programmingLanguages: string[] = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "PHP",
  "TypeScript",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Ruby",
  "C",
  "SQL",
  "HTML/CSS",
]

const experienceLevels: ExperienceLevel[] = [
  { value: "iniciante", label: "Iniciante - Nunca programei" },
  { value: "basico", label: "Básico - Conheço conceitos básicos" },
  { value: "intermediario", label: "Intermediário - Já desenvolvi alguns projetos" },
  { value: "avancado", label: "Avançado - Trabalho na área" },
  { value: "expert", label: "Expert - Sou líder técnico/arquiteto" },
]

export default function CadastrarPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
    cidade: "",
    experiencia: "",
    areasInteresse: [],
    linguagens: [],
    objetivos: "",
    disponibilidade: "",
    motivacao: "",
  })

  const [currentStep, setCurrentStep] = useState<number>(1)
  const totalSteps: number = 3

  const handleAreaToggle = (areaId: string): void => {
    setFormData(
      (prev: FormData): FormData => ({
        ...prev,
        areasInteresse: prev.areasInteresse.includes(areaId)
          ? prev.areasInteresse.filter((id: string): boolean => id !== areaId)
          : [...prev.areasInteresse, areaId],
      }),
    )
  }

  const handleLanguageToggle = (language: string): void => {
    setFormData(
      (prev: FormData): FormData => ({
        ...prev,
        linguagens: prev.linguagens.includes(language)
          ? prev.linguagens.filter((lang: string): boolean => lang !== language)
          : [...prev.linguagens, language],
      }),
    )
  }

  const nextStep = (): void => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = (): void => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log("Dados do cadastro:", formData)
    alert("Cadastro de trilha realizado com sucesso! Bem-vindo à plataforma de cursos de tecnologia!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#16213e] text-white">
      {/* Header */}
      <header className="bg-blue-900/40 backdrop-blur-md border-b border-blue-500/30 px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xl font-bold text-[#00aaff]">Voltar</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#00aaff]">Trilhas de Cursos</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Ecolha sua trilha de estudos!</h1>
            <span className="text-sm text-gray-400">
              Etapa {currentStep} de {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Etapa 1: Informações Pessoais */}
        {/*
          {currentStep === 1 && (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Code className="w-6 h-6 text-blue-400" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription className="text-gray-300">Vamos começar com suas informações básicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome" className="text-white">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setFormData({ ...formData, nome: e.target.value })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-white">
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setFormData({ ...formData, telefone: e.target.value })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="idade" className="text-white">
                      Idade
                    </Label>
                    <Input
                      id="idade"
                      type="number"
                      value={formData.idade}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                        setFormData({ ...formData, idade: e.target.value })
                      }
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="25"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cidade" className="text-white">
                    Cidade
                  </Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setFormData({ ...formData, cidade: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="São Paulo, SP"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        */}
          {/* Etapa 2: Experiência Técnica */}
          {currentStep === 1 && (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Brain className="w-6 h-6 text-green-400" />
                  Experiência Técnica
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Conte-nos sobre seu nível de experiência em tecnologia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white mb-3 block">Nível de Experiência *</Label>
                  <Select
                    value={formData.experiencia}
                    onValueChange={(value: string): void => setFormData({ ...formData, experiencia: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Selecione seu nível" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {experienceLevels.map((level: ExperienceLevel) => (
                        <SelectItem key={level.value} value={level.value} className="text-white">
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Linguagens de Programação Conhecidas</Label>
                  <p className="text-sm text-gray-400 mb-4">Selecione todas que você conhece (mesmo que básico)</p>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {programmingLanguages.map((language: string) => (
                      <div
                        key={language}
                        onClick={(): void => handleLanguageToggle(language)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                          formData.linguagens.includes(language)
                            ? "border-blue-400 bg-blue-400/20 text-blue-300"
                            : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <span className="text-sm font-medium">{language}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 3: Áreas de Interesse */}
          {currentStep === 2 && (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Áreas de Interesse
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Quais áreas da tecnologia mais despertam seu interesse?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {techAreas.map((area: TechArea) => {
                    const Icon = area.icon
                    return (
                      <div
                        key={area.id}
                        onClick={(): void => handleAreaToggle(area.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.areasInteresse.includes(area.id)
                            ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                            : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6" />
                          <span className="font-medium">{area.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 4: Objetivos e Motivação */}
          {currentStep === 3 && (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-purple-400" />
                  Objetivos e Disponibilidade
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Finalize seu cadastro com seus objetivos de carreira
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="objetivos" className="text-white">
                    Objetivos Profissionais
                  </Label>
                  <Textarea
                    id="objetivos"
                    value={formData.objetivos}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                      setFormData({ ...formData, objetivos: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Ex: Quero me tornar um desenvolvedor full-stack, conseguir meu primeiro emprego na área..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-white mb-3 block">Disponibilidade para Estudos</Label>
                  <Select
                    value={formData.disponibilidade}
                    onValueChange={(value: string): void => setFormData({ ...formData, disponibilidade: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Selecione sua disponibilidade" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="1-2h" className="text-white">
                        1-2 horas por dia
                      </SelectItem>
                      <SelectItem value="3-4h" className="text-white">
                        3-4 horas por dia
                      </SelectItem>
                      <SelectItem value="5-6h" className="text-white">
                        5-6 horas por dia
                      </SelectItem>
                      <SelectItem value="tempo-integral" className="text-white">
                        Tempo integral
                      </SelectItem>
                      <SelectItem value="fins-semana" className="text-white">
                        Apenas fins de semana
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="motivacao" className="text-white">
                    O que te motiva a estudar tecnologia?
                  </Label>
                  <Textarea
                    id="motivacao"
                    value={formData.motivacao}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                      setFormData({ ...formData, motivacao: e.target.value })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Conte-nos o que te inspira na área de tecnologia..."
                    rows={3}
                  />
                </div>

                {/* Resumo das seleções */}
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Resumo do seu perfil:</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <strong>Experiência:</strong>{" "}
                      {experienceLevels.find((l: ExperienceLevel): boolean => l.value === formData.experiencia)
                        ?.label || "Não informado"}
                    </p>
                    {formData.areasInteresse.length > 0 && (
                      <div>
                        <strong className="text-gray-300">Áreas de interesse:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.areasInteresse.map((areaId: string) => {
                            const area: TechArea | undefined = techAreas.find((a: TechArea): boolean => a.id === areaId)
                            return area ? (
                              <Badge key={areaId} variant="secondary">
                                {area.label}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                    {formData.linguagens.length > 0 && (
                      <div>
                        <strong className="text-gray-300">Linguagens conhecidas:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.linguagens.map((lang: string) => (
                            <Badge key={lang} variant="outline">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              Anterior
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                Próximo
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8"
              >
                Finalizar Cadastro de Trilha
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
