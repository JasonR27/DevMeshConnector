import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import babel from 'vite-plugin-babel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: [
          ['@babel/preset-env', { targets: "defaults" },
            '@babel/preset-react'
          ]
        ]
      }
    })
  ],
  server: {
    allowedHosts: ['frontend', 'localhost'],
    host: true,
    strictPort: true,
    port: 3000,
  },
})
