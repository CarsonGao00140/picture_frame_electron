import { defineConfig } from 'vite';
import { execaCommand } from 'execa';
import { builtinModules } from 'module';

let electronProcess: ReturnType<typeof execaCommand> | null;

const electronDev = () => ({
    name: 'vite-plugin-electron-preview',
    buildStart() {
        electronProcess?.kill('SIGTERM');
    },
    writeBundle() {
        electronProcess =  execaCommand(
            'electron .' + (process.env['SSH_CONNECTION']
                ? ' --remote-debugging-port=9222 --remote-allow-origins=devtools://devtools'
                : ''),
            { stdio: 'inherit' }
        );
    }
})

export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            entry: 'main/main.ts',
            formats: ['es'],
        },
        target: 'esnext',
        rollupOptions: {
            external: [
                'electron', 
                ...builtinModules.flatMap(module => [module, `node:${module}`])
            ]
        }
    },
    plugins: [
        mode === 'development' && electronDev(),
    ],
}))
