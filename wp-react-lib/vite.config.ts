import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as packageJson from './package.json';
import preserveDirectives from "rollup-plugin-preserve-directives";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
            tsconfigPath: './tsconfig.json',
            include: ['./src/**/*'],
        }),
        tsconfigPaths(),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: '@devgateway/dvz-ui'
        },
        commonjsOptions: {
            transformMixedEsModules: true,
            exclude: ['node_modules'],
        },
        rollupOptions: {
            external: [
                ...Object.keys(packageJson.dependencies || {}),
                ...Object.keys(packageJson.devDependencies || {}),
                'react',
                'react-dom',
                'react-dom/client',
                'react/jsx-runtime',
            ],
            input: {
                index: resolve(__dirname, 'src/index.js'),
                'api/index': resolve(__dirname, 'src/api/index.js'),
            },
            plugins: [preserveDirectives()],
            output: [
                {
                    dir: "dist/cjs",
                    format: "cjs",
                    sourcemap: false,
                    preserveModules: true,
                    preserveModulesRoot: "src",
                    entryFileNames: `[name].js`,
                    globals: {
                        react: 'React',
                        'react/jsx-runtime': 'jsxRuntime',
                        'react-dom': 'ReactDOM',
                    },
                },
                {
                    dir: "dist/esm",
                    format: "esm",
                    sourcemap: false,
                    entryFileNames: `[name].js`,
                    preserveModules: true,
                    preserveModulesRoot: "src",
                    globals: {
                        react: 'React',
                        'react/jsx-runtime': 'jsxRuntime',
                        'react-dom': 'ReactDOM',
                    },
                }
            ]
        }
    },
});