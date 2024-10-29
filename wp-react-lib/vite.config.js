import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react({
        babel: {
            presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }]
            ]
        }
    })],
    build: {
        minify: false,
        lib: {
            entry: [
                "./src/**/*.js",
                "./src/**/*.jsx"
            ],
            name: 'wp-react-lib',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            input: './src/index.js',
            external: ['react', 'react-dom', 'react/jsx-runtime'],
        },
        copyPublicDir: false
    }
})