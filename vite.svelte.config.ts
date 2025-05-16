import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
    root: 'renderer',
    build: {
        outDir: '../dist',
        target: 'esnext',
        modulePreload: {
            polyfill: false
        },
    },
    plugins: [
        svelte(),
    ]
})
