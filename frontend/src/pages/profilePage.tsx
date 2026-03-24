
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, BookOpen, MoreVertical, Loader2, AlertCircle, CheckCircle, LogOut } from 
"lucide-react";
import ParticleBackground from "@/components/effects/particlebackground";

// --- Interfaces para Tipagem dos Dados ---
interface Usuario {
    id: number;
    nome: string;
    email: string;
}

interface TrilhaInscrita {
    id: number;
    nome: string;
    progresso: 'Inscrito' | 'Cursando' | 'Suspenso' | 'Concluido';
}

// Mapeamento de cores para os status
const statusColors: { [key: string]: string } = {
    Inscrito: 'bg-blue-700/20 text-blue-300 border-blue-500/30',
    Cursando: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Suspenso: 'bg-gray-100/20 text-gray-300 border-gray-500/30',
    Concluido: 'bg-green-500/20 text-green-300 border-green-500/30',
};

export default function PerfilPage(): React.JSX.Element {
    const navigate = useNavigate();

    // --- Estados do Componente ---
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [trilhas, setTrilhas] = useState<TrilhaInscrita[]>([]);
    const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('loading');
    const [feedback, setFeedback] = useState<string>('');

    // --- Função para Buscar Dados do Perfil ---
    useEffect(() => {
        const dadosUsuarioString = localStorage.getItem('usuarioLogado');
        if (!dadosUsuarioString) {
            navigate('/login');
            return; // Para a execução se não houver usuário
        }
        const usuarioLogado: Usuario = JSON.parse(dadosUsuarioString);
        setUsuario(usuarioLogado); // Define o usuário no estado

        // Função interna para buscar os dados
        const carregarDadosDoPerfil = async () => {
            setStatus('loading');
            try {
                const response = await fetch(`http://localhost:8000/perfil_aluno.php?alunoId=${usuarioLogado.id}`);
                if (!response.ok) throw new Error('Falha ao carregar dados do perfil.');

                const data = await response.json();
                // Não precisamos mais fazer setUsuario(data.aluno) pois já fizemos acima
                setTrilhas(data.trilhas);
                setStatus('idle');
            } catch (err) {
                setFeedback(err instanceof Error ? err.message : 'Erro desconhecido.');
                setStatus('error');
            }
        };

        carregarDadosDoPerfil();

    }, [navigate]);


    // --- Função para Atualizar o Progresso ---
    const handleProgressoChange = async (trilhaId: number, novoProgresso: TrilhaInscrita['progresso']) => {
        if (!usuario) return;

        // Otimização: Atualiza a UI primeiro para uma resposta mais rápida
        const trilhasAntigas = [...trilhas];
        setTrilhas(trilhas.map(t => t.id === trilhaId ? { ...t, progresso: novoProgresso } : t));

        try {
            const response = await fetch('http://localhost:8000/atualizar_progresso.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    alunoId: usuario.id,
                    trilhaId: trilhaId,
                    progresso: novoProgresso,
                }),
            });
            if (!response.ok) throw new Error('Falha ao atualizar o progresso.');
            // Se a API confirmar, tudo certo.
        } catch (err) {
            // Se der erro, reverte a mudança na UI e mostra o erro
            alert("Não foi possível atualizar o progresso. Tente novamente.");
            setTrilhas(trilhasAntigas);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogado');
        navigate('/login');
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
            </div>
        );
    }

    if (status === 'error' || !usuario) {
        return (
            <div className="centralize">
                <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                <h1 className="textCard">Ocorreu um Erro</h1>
                <p>{feedback || "Não foi possível carregar os dados do perfil."}</p>
                <button onClick={() => navigate('/login')} className="buttonPrimary">Voltar para o Login</button>
            </div>
        );
    }

    return (

        <>
            <ParticleBackground />
            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                {/* Cabeçalho do Perfil */}
                
                <header className="itemsJustify">
                    <div>
                        <h1 className="title text-5xl">Olá, {usuario.nome.split(' ')[0]}!</h1>
                        <p className="">Aqui está o resumo da sua jornada de aprendizado.</p>
                    </div>

                <button onClick={handleLogout} className="buttonNav">
                    <LogOut size={16} />
                    Sair
                </button>

                </header>

                {/* Seção de Trilhas */}
                <section>
                    <h2 className="textCard itemsJustify2">
                        <BookOpen className="text-blue-400" />
                        Minhas Trilhas
                    </h2>

                    {trilhas.length > 0 ? (
                        <div className="containerGrid ">
                            {trilhas.map(trilha => (
                                <div key={trilha.id} className="card1">
                                    <div>
                                        <h3 className="textCard3">
                                            <Link
                                                to={`/aulas/${trilha.id}`}
                                                className="textLink"
                                            >
                                                {trilha.nome}
                                            </Link>
                                        </h3>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[trilha.progresso]}`}>
                                            {trilha.progresso}
                                        </div>
                                    </div>
                                    <div className="mt-6 relative">
                                        <details className="group">
                                            <summary className=" itemsJustify2 justify-end textLink">
                                                <span>Alterar Status</span>
                                                <MoreVertical size={20} />
                                            </summary>
                                            <div className=" dropDown">
                                                {Object.keys(statusColors).map(statusKey => (
                                                    <button
                                                        key={statusKey}
                                                        onClick={() => handleProgressoChange(trilha.id, statusKey as TrilhaInscrita['progresso'])}
                                                        className="centralize2"
                                                    >
                                                        {statusKey}
                                                    </button>
                                                ))}
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className=" centralize card2">
                            <h3 className="textCard2">Você ainda não se inscreveu em nenhuma trilha.</h3>
                            <p className="">Que tal começar uma nova jornada?</p>
                            <Link to="/trilhas" className="buttonOutline">
                                Explorar Trilhas
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
