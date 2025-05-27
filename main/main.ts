import fs from 'fs';
import path from 'path';
import os from 'os';
import { app, BrowserWindow } from 'electron';
import createServer from './server';

let httpServer: ReturnType<typeof createServer> | undefined;

const appDataDir = path.join(app.getPath('userData'), 'appData');
const imagesDir = path.join(appDataDir, 'images');
fs.existsSync(imagesDir) || fs.mkdirSync(imagesDir, { recursive: true });
httpServer = createServer(imagesDir, 3000);

if (os.cpus()?.[0]?.model === 'Cortex-A55') {
    app.commandLine.appendSwitch('use-gl', 'angle');
    app.commandLine.appendSwitch('use-angle', 'gles-egl');
}

app.whenReady().then(() => {
    const window = new BrowserWindow({
        show: false,
        kiosk: os.platform() === 'linux',
    });

    if (app.isPackaged) {
        window.on('ready-to-show', window.show);
        window.loadFile('dist/index.html');
    } else {
        window.on('ready-to-show', window.showInactive);
        window.loadURL('http://localhost:5173');
        if (process.env['SSH_CONNECTION']) return;
        window.webContents.openDevTools();
    };
})

app.on('will-quit', () => httpServer?.close())
