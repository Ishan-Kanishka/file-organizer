# Development Guide

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 14.0.0 or higher
- **npm**: Comes with Node.js
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Initial Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd file-organizer

# Install dependencies
npm install

# Start development server
npm start
```

## 🏗️ Development Workflow

### 1. Development Mode
```bash
npm start          # Start app in development mode
npm run dev        # Alias for npm start
```

### 2. Building for Distribution
```bash
npm run build     # Build for current platform
npm run dist      # Build for current platform (no publish)
npm run dist:win  # Build specifically for Windows
npm run dist:mac  # Build specifically for macOS
npm run dist:linux # Build specifically for Linux
```

### 3. Testing
```bash
# Test the core organizer logic
npm run organize  # Run organizer.js directly
```

## 📁 Code Organization

### Main Process (`main.js`)
- **Window Management**: Creates and manages application windows
- **IPC Handlers**: Handles communication from renderer process
- **System Integration**: File dialogs, app lifecycle

**Key Functions:**
```javascript
// Add new IPC handlers here
ipcMain.handle('new-feature', async (event, data) => {
    // Implementation
    return result;
});
```

### Preload Script (`preload.js`)
- **API Bridge**: Exposes secure methods to renderer
- **Security**: Controls what renderer can access

**Adding New APIs:**
```javascript
contextBridge.exposeInMainWorld('electronAPI', {
    // Existing APIs...
    newFeature: () => ipcRenderer.invoke('new-feature')
});
```

### Renderer Process (`renderer.js`)
- **UI Logic**: Handles user interactions
- **State Management**: Manages application state
- **API Calls**: Communicates with main process

**Adding New Features:**
```javascript
// Add new event listeners
newFeatureBtn.addEventListener('click', async () => {
    try {
        const result = await window.electronAPI.newFeature();
        // Handle result
    } catch (error) {
        // Handle error
    }
});
```

### Core Logic (`organizer.js`)
- **File Processing**: Core file organization algorithm
- **Categorization**: File type detection and sorting
- **Error Handling**: Robust error management

**Modifying Categories:**
```javascript
const categories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    // Add new categories here
    NewCategory: ['.new', '.ext']
};
```

## 🔧 Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "start": "electron .",           // Development
    "build": "electron-builder",     // Build all platforms
    "dist": "electron-builder --publish=never",  // Build current platform
    "dist:win": "electron-builder --win --publish=never",
    "dist:mac": "electron-builder --mac --publish=never",
    "dist:linux": "electron-builder --linux --publish=never"
  }
}
```

### Build Configuration
The `build` section in `package.json` controls:
- **App ID**: Unique identifier for your app
- **Product Name**: Display name in installer
- **Targets**: Build formats for each platform
- **NSIS Settings**: Windows installer configuration

## 🐛 Debugging

### Development Tools
```javascript
// In main.js - opens DevTools in development
if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
}
```

### Console Logging
```javascript
// In organizer.js - logs to main process console
console.log('Processing file:', fileName);

// In renderer.js - logs to DevTools console
console.log('User clicked organize button');
```

### Error Handling
```javascript
try {
    // Risky operation
    await riskyOperation();
} catch (error) {
    console.error('Operation failed:', error.message);
    // Handle error appropriately
}
```

## 🚀 Adding New Features

### 1. Plan the Feature
- Define requirements
- Determine if it needs main process access
- Plan UI changes

### 2. Implement Backend
- Add IPC handler in `main.js`
- Expose API in `preload.js`
- Implement core logic

### 3. Implement Frontend
- Add UI elements in `index.html`
- Style in `style.css`
- Add logic in `renderer.js`

### 4. Test
- Test in development mode
- Test build process
- Test on target platforms

## 📦 Building and Distribution

### Build Process
1. **Development**: `npm start`
2. **Testing**: Test all features thoroughly
3. **Building**: `npm run dist:win` (or target platform)
4. **Testing Build**: Test the generated installer/portable app
5. **Distribution**: Share the installer with users

### Build Outputs
- **Windows**: `.exe` installer + portable version
- **macOS**: `.dmg` installer
- **Linux**: `.AppImage` portable app

### Version Management
```json
{
  "version": "1.0.0"  // Update this for each release
}
```

## 🔒 Security Best Practices

### Current Security Features
- ✅ Context isolation enabled
- ✅ Node integration disabled
- ✅ Preload script for controlled API exposure
- ✅ IPC communication only

### Security Guidelines
- Never expose Node.js APIs directly to renderer
- Validate all IPC data
- Use contextIsolation and preload scripts
- Keep dependencies updated

## 🧪 Testing

### Manual Testing Checklist
- [ ] App launches correctly
- [ ] Folder selection works
- [ ] File organization works
- [ ] Error handling works
- [ ] UI is responsive
- [ ] Build process works
- [ ] Installer works

### Automated Testing (Future Enhancement)
```bash
# Add testing framework
npm install --save-dev jest electron-test

# Add test scripts to package.json
"test": "jest",
"test:e2e": "electron-test"
```

## 📚 Resources

### Electron Documentation
- [Electron Main Process](https://www.electronjs.org/docs/latest/tutorial/main-process)
- [IPC Communication](https://www.electronjs.org/docs/latest/tutorial/ipc)
- [Security](https://www.electronjs.org/docs/latest/tutorial/security)

### Build Tools
- [electron-builder](https://www.electron.build/)
- [NSIS Installer](https://nsis.sourceforge.io/)

### Best Practices
- [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)
- [App Architecture](https://www.electronjs.org/docs/latest/tutorial/application-architecture)
