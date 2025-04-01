import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'jwt-decode': fileURLToPath(new URL('node_modules/jwt-decode/build/jwt-decode.esm.js', import.meta.url))
        }
    },
});
