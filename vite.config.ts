/*
 *
 * configuração Vite
 *
*/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // define a raiz do projeto para o vite.
  build: {
    outDir: 'dist', // onde os arquivos de build serão gerados
  },
  publicDir: 'public',
})
