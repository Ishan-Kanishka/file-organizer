const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () => ipcRenderer.invoke('select-folder'),
    organizeFiles: (folderPath) => ipcRenderer.invoke('organize-files', folderPath)
});

