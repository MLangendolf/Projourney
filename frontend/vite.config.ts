/*
 *
 * configuração Vite
 *
*/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importa o módulo 'path' do Node.js

export default defineConfig({
  plugins: [react()],
  root: './',  // define a raiz do projeto para o vite.
  build: {
    outDir: 'dist', // onde os arquivos de build serão gerados
  },
  publicDir: 'public',
  resolve: { // Adicione esta seção
    alias: {
      '@': path.resolve(__dirname, './src'), // Mapeia @/ para o diretório src
    },
  },
});
