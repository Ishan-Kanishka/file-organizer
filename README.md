# 📁 File Organizer

> **A professional desktop application for automatically organizing files by type using Electron**

[![Electron](https://img.shields.io/badge/Electron-37.2.6-47848F?style=flat-square&logo=electron)](https://electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-14+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey?style=flat-square)](https://github.com/your-username/file-organizer)

## 🚀 Features

- **📂 Smart File Categorization**: Automatically sorts files by type into organized folders
- **🖥️ Cross-Platform**: Works on Windows, macOS, and Linux
- **🎨 Modern UI**: Clean, intuitive interface with real-time feedback
- **🔒 Secure**: Built with Electron security best practices
- **📦 Professional Builds**: Generates installers and portable versions
- **⚡ Fast**: Efficient file operations with progress tracking
- **🔄 Real-time Logging**: Live updates during file organization

## 📋 Supported File Types

| Category | Extensions | Description |
|----------|------------|-------------|
| **Images** | `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp` | Photos and graphics |
| **Videos** | `.mp4`, `.mov`, `.avi`, `.mkv`, `.flv` | Video files |
| **Documents** | `.pdf`, `.doc`, `.docx`, `.txt`, `.xls`, `.xlsx`, `.ppt`, `.pptx` | Office documents |
| **Music** | `.mp3`, `.wav`, `.aac`, `.flac` | Audio files |
| **Archives** | `.zip`, `.rar`, `.7z`, `.tar`, `.gz` | Compressed files |
| **Others** | Any other extensions | Uncategorized files |

## 🖼️ Screenshots

> *Screenshots will be added here once the app is running*

## 🛠️ Installation

### Prerequisites
- **Node.js**: Version 14.0.0 or higher
- **npm**: Package manager (comes with Node.js)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/file-organizer.git
   cd file-organizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

### Building from Source

#### Development Mode
```bash
npm start          # Start app in development mode
npm run dev        # Alias for npm start
```

#### Build for Distribution
```bash
# Build for current platform
npm run dist

# Build for specific platform
npm run dist:win   # Windows
npm run dist:mac   # macOS
npm run dist:linux # Linux

# Build for all platforms
npm run build
```

## 📱 Usage

### Basic Workflow

1. **Launch the Application**
   - Run `npm start` or double-click the built executable

2. **Select Folder**
   - Click "Select Folder" to choose the directory to organize
   - Use the file dialog to navigate to your target folder

3. **Start Organizing**
   - Click "Start Organizing" to begin the process
   - Watch real-time progress in the log area

4. **Review Results**
   - Check the organized folder structure
   - Review the log for any issues or confirmations

### Advanced Features

- **Real-time Feedback**: Monitor progress as files are organized
- **Error Handling**: Clear error messages for any issues
- **Non-blocking UI**: Application remains responsive during operations
- **Detailed Logging**: Complete audit trail of all file operations

## 🏗️ Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Electron
- **Build Tool**: electron-builder
- **Security**: Context isolation, preload scripts, IPC communication

### Project Structure
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
│   └── PROJECT_STRUCTURE.md    # Detailed project structure
│
├── 📁 Documentation
│   ├── README.md               # This file
│   ├── DEVELOPMENT.md          # Development guide
│   ├── DEPLOYMENT.md           # Build & deployment guide
│   └── CHANGELOG.md            # Version history
│
└── 📁 Build Outputs (generated)
    └── dist/                   # Build artifacts
```

### Security Features
- ✅ **Context Isolation**: Prevents direct access to Node.js APIs
- ✅ **Preload Scripts**: Controlled API exposure through secure bridge
- ✅ **IPC Communication**: Secure inter-process communication
- ✅ **No Node Integration**: Renderer process cannot access system APIs directly

## 🔧 Development

### Getting Started
See [DEVELOPMENT.md](DEVELOPMENT.md) for comprehensive development information.

### Key Commands
```bash
npm start          # Development mode
npm run build      # Build for distribution
npm run dist:win   # Build Windows installer
npm test           # Run tests (when implemented)
```

### Adding Features
1. **Plan**: Define requirements and architecture
2. **Implement**: Add IPC handlers, UI elements, and logic
3. **Test**: Verify functionality in development mode
4. **Build**: Test the build process
5. **Document**: Update relevant documentation

## 📦 Distribution

### Build Outputs
- **Windows**: `.exe` installer + portable version
- **macOS**: `.dmg` installer
- **Linux**: `.AppImage` portable app

### Distribution Channels
- **Direct Download**: Host installer files on your website
- **GitHub Releases**: Upload to GitHub releases page
- **Package Managers**: Chocolatey (Windows), Homebrew (macOS)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed build and distribution information.

## 🧪 Testing

### Manual Testing Checklist
- [ ] App launches correctly
- [ ] Folder selection works
- [ ] File organization works
- [ ] Error handling works
- [ ] UI is responsive
- [ ] Build process works
- [ ] Installer works

### Automated Testing (Future)
```bash
npm test           # Unit tests
npm run test:e2e   # End-to-end tests
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and architecture
- Add tests for new features
- Update documentation as needed
- Ensure security best practices are maintained

## 📚 Documentation

- **[DEVELOPMENT.md](DEVELOPMENT.md)**: Complete development guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Build and deployment instructions
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**: Detailed project architecture
- **[CHANGELOG.md](CHANGELOG.md)**: Version history and changes

## 🐛 Troubleshooting

### Common Issues

#### App Won't Start
```bash
# Check Node.js version
node --version  # Should be 14.0.0 or higher

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Build Fails
```bash
# Clean build artifacts
rm -rf dist/

# Reinstall electron-builder
npm install --save-dev electron-builder

# Try building again
npm run dist:win
```

#### File Organization Issues
- Ensure target folder has write permissions
- Check if files are locked by other applications
- Verify sufficient disk space

### Getting Help
- Check the [documentation](DEVELOPMENT.md)
- Review [troubleshooting section](DEPLOYMENT.md#troubleshooting-build-issues)
- Open an [issue](../../issues) on GitHub

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Electron Team**: For the amazing desktop app framework
- **electron-builder**: For professional build and packaging tools
- **Node.js Community**: For the robust runtime environment

## 📞 Support

- **Documentation**: [DEVELOPMENT.md](DEVELOPMENT.md)
- **Issues**: [GitHub Issues](../../issues)
- **Discussions**: [GitHub Discussions](../../discussions)

---

**Made with ❤️ using Electron and Node.js**

> **Note**: This is a professional-grade desktop application built with modern web technologies. It follows security best practices and provides a robust foundation for file management tasks.

