const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        title: 'File Organizer',
        icon: null
    });

    mainWindow.loadFile('index.html');

    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC handlers
ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: 'Select folder to organize'
    });
    
    if (!result.canceled) {
        return result.filePaths[0];
    }
    return null;
});

ipcMain.handle('organize-files', async (event, folderPath) => {
    try {
        // Import the organizeFiles function from organizer.js
        const { organizeFiles } = require('./organizer.js');
        await organizeFiles(folderPath);
        return { success: true, message: 'Files organized successfully!' };
    } catch (error) {
        return { success: false, message: `Error: ${error.message}` };
    }
});

