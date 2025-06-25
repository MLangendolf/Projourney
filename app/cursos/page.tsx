'use client'

import { useState } from 'react';
import { cursos } from '../../components/Dados/cursos';

export default function ListaCursos() {
  const [inscricoes, setInscricoes] = useState<number[]>([]);

  const handleInscrever = (id: number) => {
    if (!inscricoes.includes(id)) {
      setInscricoes([...inscricoes, id]);
      alert('Inscrição realizada com sucesso!');
    } else {
      alert('Você já está inscrito neste curso!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Cursos Disponíveis</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {cursos.map((curso) => (
          <div key={curso.id} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-semibold">{curso.title}</h2>
              <p className="mb-4">{curso.description}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleInscrever(curso.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Inscrever-se
              </button>

              {/* Logo da Instituição */}
              <div className="flex flex-col items-center">
                <img src={curso.logo} alt={curso.instituicao} className="w-12 h-12 mb-1 object-contain" />
                <span className="text-sm text-gray-400">{curso.instituicao}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
