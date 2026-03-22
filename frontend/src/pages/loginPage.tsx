import { useState } from "react"
import type React from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import ParticleBackground from "@/components/effects/particlebackground"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Github, Chrome } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"  // Mudança do 'next/link' para o 'react-router-dom"
import SimpleLink from "../components/common/simpleLink"
import InteractiveButton from "../components/common/interactive-button";
import type { JSX } from "react/jsx-runtime"

interface LoginFormData {
    email: string
    password: string
    rememberMe: boolean
}

export default function LoginPage(): JSX.Element {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false,
    })

    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:8000/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.mensagem || 'Ocorreu um erro desconhecido.')
            }

            alert(result.mensagem)

            // Guarda os dados do usuário no navegador para 'lembrar' que está logado.
            localStorage.setItem('usuarioLogado', JSON.stringify(result.dados_usuario))


            navigate('/perfil')

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'falha na comunicação.';
            setError(errorMessage);

        } finally {
            setIsLoading(false); // Desativa o estado de 'carregando'.
        }
    }

    const handleSocialLogin = (provider: string): void => {
        console.log(`Login com ${provider}`)
        alert(`Redirecionando para login com ${provider}...`)
    }

    return (
        <div className="centralize">
            <ParticleBackground />
            <div>
                <div className="divCard">
                    <SimpleLink
                        to="/"
                        variant="navLink"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-lg font-semibold">Voltar ao início</span>
                    </SimpleLink>
                </div>
                <div>
                    <h1 className="title">Bem-vindo de volta!</h1>
                    <p className="divCard">Entre na sua conta para continuar aprendendo</p>
                </div>

                {/* Login  */}
                <Card className="card1">
                    <CardHeader className="space-y-1">
                        <CardTitle className="title">
                            <Lock/>
                            Entrar na Conta
                        </CardTitle>
                        <CardDescription>Digite suas credenciais para acessar sua conta</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* quando o email da erro*/}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="textCard2">
                                    E-mail *
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="bg-gray-800 border-gray-600 text-white pl-10 focus:border-blue-400"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* senha errada */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="textCard2">
                                    Senha *
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="bg-gray-800 border-gray-600 text-white pl-10 pr-10 focus:border-blue-400"
                                        placeholder="Sua senha"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={(): void => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                            setFormData({ ...formData, rememberMe: e.target.checked })
                                        }
                                        className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-300">
                                        Lembrar de mim
                                    </Label>
                                </div>
                                <Link to="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    Esqueceu a senha?
                                </Link>
                            </div>

                            {error && (
                                <div className="text-cente text-red-400 bg-red-900/50 p-2 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Login Button */}
                            <InteractiveButton
                                type="submit"
                                disabled={isLoading}
                                variant="primary"
                                as="button" // Specify that this should render as a button
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Entrando...</span>
                                    </div>
                                ) : (
                                    "Entrar"
                                )}
                            </InteractiveButton>
                        </form>
                    
                            <p className="divCard">
                                Não tem uma conta?
                                <SimpleLink to="/cadastrar" variant="navLink">
                                    Cadastre-se aqui
                                </SimpleLink>
                            </p>
                    </CardContent>
                </Card>

                {/* Features */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm mb-4">Ao entrar, você terá acesso a:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-gray-400">
                            <span className="text-blue-400">✓</span> Cursos personalizados
                        </div>
                        <div className="text-gray-400">
                            <span className="text-green-400">✓</span> Progresso salvo
                        </div>
                        <div className="text-gray-400">
                            <span className="text-yellow-400">✓</span> Certificados
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

