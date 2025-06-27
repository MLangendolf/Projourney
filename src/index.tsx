// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Importe BrowserRouter
import Router from './router'; // <-- ATENÇÃO: Importe o componente Router (com R maiúsculo) do caminho correto
import './app/globals.css'; // Certifique-se de que seu CSS global está sendo importado

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Envolva seu componente principal aqui */}
      <Router /> {/* <-- ATENÇÃO: Use o componente Router (com R maiúsculo) */}
    </BrowserRouter>
  </React.StrictMode>,
);
