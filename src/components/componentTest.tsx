// src/main.tsx

import { warn } from 'console';
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';



const inerte: string = "src/image/pj_image.png";

const ativo: string = "src/image/pj_image.jpeg"; 

const App = () => {

  const [currentImage, setCurrentImage] = useState <string>(inerte);

  // Função para lidar com o evento mouseover
  const MouseOver = () => {
    setCurrentImage(ativo); // Altera a imagem para a de hover
  };

  // Função para lidar com o evento mouseout (quando o mouse sai)
  const MouseOut = () => {
    setCurrentImage(inerte); // Volta para a imagem padrão
  };

  return (
    <div>
      <h1>Teste React no Projourney.</h1>
     
      <img 
        id="pj" 
        src={currentImage}
        alt="Projourney" 
        style={{ width: '200px', height: 'auto' }}
        onMouseOver={MouseOver} // Evento React para mouseover
        onMouseOut={MouseOut}   // Evento React para mouseout
      />
      <p>Componente de teste. Captura de evento (mouse): {currentImage}</p>
    </div>
  );
};

// procura o elemento raiz no HTML e renderize o componente
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

