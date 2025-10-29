// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa o BrowserRouter
import App from './app'; // Importa o componente pricipal (raiz) da aplicação
import './assets/globals.css'; // importa folha de estilização (CSS) global

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
{/* O BrowserRouter deve envolver o App para que as rotas funcionem em qualquer lugar */}
    <BrowserRouter> 
      <App /> 
    </BrowserRouter>
  </React.StrictMode>,
);
