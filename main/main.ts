import { cpus, platform } from 'os';
import { app, BrowserWindow } from 'electron';

if (cpus()?.[0]?.model === 'Cortex-A55') {
    app.commandLine.appendSwitch('use-gl', 'angle');
    app.commandLine.appendSwitch('use-angle', 'gles-egl');
}

app.whenReady().then(() => {
    const window = new BrowserWindow({
        show: false,
        kiosk: platform() === 'linux',
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
