// src/router.tsx

import { Routes, Route } from 'react-router-dom';

// Importe seus componentes de página existentes
import HomePage from './app/layout';
import CadastrarPage from './app/cadastrar/page';
import LoginPage from './app/login/page';
import TrilhasPage from './app/trilhas/page';
import { CoursesPage, CourseDetailPage } from './app/cursos/page';


function Router() {
    return (
        <Routes>
            {/* ATENÇÃO: Os paths devem ser URLs, não nomes de arquivos */}
            <Route path="/" element={<HomePage />} /> {/* Rota para a página inicial */}
            <Route path="/cadastrar" element={<CadastrarPage />} /> {/* Rota para a página de cadastro */}
            <Route path="/login" element={<LoginPage />} /> {/* Rota para a página de login */}
            <Route path="/cursos" element={<CoursesPage />} /> {/* Rota para a página de cursos */}
            <Route path="/cursos/:id" element={<CourseDetailPage />} /> {/* Rota para detalhes do curso */}
            <Route path="/trilhas" element={<TrilhasPage />} />
            {/* Adicione suas outras rotas aqui, mapeando o caminho para o componente */}
            {/* Exemplo: <Route path="/simulado" element={<SimuladoPage />} /> */}
            {/* Exemplo: <Route path="/inicio" element={<InicioPage />} /> */}
        </Routes>
    );
}

// Exportação mudou para Router (com R maiúsculo)
export default Router;
