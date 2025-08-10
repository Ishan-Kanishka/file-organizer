# Project Structure

```
file-organizer/
├── 📁 Source Code
│   ├── main.js                 # Electron main process
│   ├── preload.js              # Secure IPC bridge
│   ├── renderer.js             # Frontend logic & UI handlers
│   ├── organizer.js            # Core file organization algorithm
│   ├── index.html              # Main application UI
│   └── style.css               # Application styling
│
├── 📁 Configuration
│   ├── package.json            # Project metadata & dependencies
│   ├── .gitignore              # Git ignore patterns
│   └── PROJECT_STRUCTURE.md    # This file
│
├── 📁 Documentation
│   ├── README.md               # Main project documentation
│   ├── DEVELOPMENT.md          # Development guide
│   ├── DEPLOYMENT.md           # Build & deployment guide
│   └── CHANGELOG.md            # Version history
│
├── 📁 Build Outputs (generated)
│   ├── dist/                   # Build artifacts
│   │   ├── win-unpacked/       # Portable Windows app
│   │   └── *.exe               # Windows installer
│   └── build/                  # Build configuration
│
├── 📁 Dependencies
│   └── node_modules/           # NPM packages (auto-generated)
│
└── 📁 Example Data
    └── messy-folder/           # Sample folder for testing
        ├── Documents/
        └── Images/
```

## File Descriptions

### Core Application Files
- **`main.js`**: Electron main process that creates windows and handles system-level operations
- **`preload.js`**: Secure bridge between main and renderer processes using contextIsolation
- **`renderer.js`**: Frontend JavaScript that handles user interactions and UI updates
- **`organizer.js`**: Core business logic for file categorization and organization

### User Interface Files
- **`index.html`**: Main application HTML structure
- **`style.css`**: Application styling and responsive design

### Configuration Files
- **`package.json`**: Project configuration, dependencies, and build scripts
- **`.gitignore`**: Git ignore patterns for build outputs and dependencies

### Build & Distribution
- **`dist/`**: Generated build outputs (installers, portable apps)
- **`build/`**: Build configuration and assets (when needed)

## Architecture Overview

```
┌─────────────────┐    IPC    ┌─────────────────┐    DOM    ┌─────────────────┐
│   Main Process  │◄─────────►│  Preload Script │◄─────────►│  Renderer Process│
│   (main.js)     │           │   (preload.js)  │           │  (renderer.js)   │
│                 │           │                 │           │                 │
│ • Window Mgmt   │           │ • Secure Bridge │           │ • UI Events      │
│ • File Dialogs  │           │ • API Exposure  │           │ • User Input     │
│ • System Calls  │           │ • IPC Handling  │           │ • DOM Updates    │
└─────────────────┘           └─────────────────┘           └─────────────────┘
         │                                                           │
         │                                                           │
         ▼                                                           ▼
┌─────────────────┐                                    ┌─────────────────┐
│  Core Logic     │                                    │   User Interface│
│ (organizer.js)  │                                    │ (index.html +   │
│                 │                                    │  style.css)     │
│ • File Reading  │                                    │                 │
│ • Categorization│                                    │ • Buttons       │
│ • File Moving   │                                    │ • Input Fields  │
│ • Error Handling│                                    │ • Log Display   │
└─────────────────┘                                    └─────────────────┘
```

## Security Features

- **Context Isolation**: Prevents direct access to Node.js APIs from renderer
- **Preload Script**: Controlled API exposure through secure bridge
- **IPC Communication**: Secure inter-process communication
- **No Node Integration**: Renderer process cannot access system APIs directly

## Build Process

1. **Development**: `npm start` - Runs app in development mode
2. **Building**: `npm run build` - Creates distributable packages
3. **Platform Specific**: `npm run dist:win/mac/linux` - Build for specific OS
4. **Output**: Generated in `dist/` folder with installers and portable versions
