
// src/router.tsx

import { Routes, Route } from 'react-router-dom';

// Importe seus componentes de página existentes
import HomePage from './app/layout';
import CadastrarPage from './app/cadastrar/page';
import LoginPage from './app/login/page';

function Router() {
  return (
    <Routes>
      {/* ATENÇÃO: Os paths devem ser URLs, não nomes de arquivos */}
      <Route path="/" element={<HomePage />} /> {/* Rota para a página inicial */}
      <Route path="/cadastrar" element={<CadastrarPage />} /> {/* Rota para a página de cadastro */}
      <Route path="/login" element={<LoginPage />} /> {/* Rota para a página de login */}

      {/* Adicione suas outras rotas aqui, mapeando o caminho para o componente */}
      {/* Exemplo: <Route path="/simulado" element={<SimuladoPage />} /> */}
      {/* Exemplo: <Route path="/inicio" element={<InicioPage />} /> */}
    </Routes>
  );
}

// Exportação mudou para Router (com R maiúsculo)
export default Router;
