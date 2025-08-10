# Deployment Guide

## 🚀 Building for Distribution

### Prerequisites
- **Node.js**: Version 14.0.0 or higher
- **npm**: Package manager
- **Git**: Version control (optional but recommended)

### Build Commands

#### Quick Build (Current Platform)
```bash
npm run dist
```

#### Platform-Specific Builds
```bash
# Windows
npm run dist:win

# macOS
npm run dist:mac

# Linux
npm run dist:linux

# All platforms
npm run build
```

## 📦 Build Outputs

### Windows Build
```
dist/
├── File Organizer Setup 1.0.0.exe    # NSIS Installer
├── win-unpacked/                      # Portable version
│   └── File Organizer.exe            # Standalone executable
└── *.blockmap                        # Update files
```

### macOS Build
```
dist/
├── File Organizer-1.0.0.dmg          # DMG Installer
└── mac/                              # App bundle
    └── File Organizer.app            # macOS application
```

### Linux Build
```
dist/
├── File Organizer-1.0.0.AppImage     # Portable AppImage
└── linux-unpacked/                   # Unpacked files
    └── file-organizer                # Executable
```

## 🔧 Build Configuration

### Package.json Build Section
```json
{
  "build": {
    "appId": "com.fileorganizer.app",
    "productName": "File Organizer",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!node_modules/**/*",
      "!dist/**/*",
      "!*.log",
      "!messy-folder/**/*"
    ],
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64"]
        }
      ]
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }
}
```

### Customizing Builds

#### Windows NSIS Settings
```json
"nsis": {
  "oneClick": false,                           // Custom installation
  "allowToChangeInstallationDirectory": true,  // Choose install location
  "createDesktopShortcut": true,               // Desktop shortcut
  "createStartMenuShortcut": true,             // Start menu shortcut
  "installerIcon": "build/icon.ico",          // Custom installer icon
  "uninstallerIcon": "build/icon.ico",        // Uninstaller icon
  "installerHeader": "build/installerHeader.bmp", // Custom header
  "installerSidebar": "build/installerSidebar.bmp" // Custom sidebar
}
```

#### macOS DMG Settings
```json
"mac": {
  "target": "dmg",
  "icon": "build/icon.icns",
  "category": "public.app-category.utilities",
  "hardenedRuntime": true,
  "gatekeeperAssess": false
}
```

#### Linux AppImage Settings
```json
"linux": {
  "target": "AppImage",
  "icon": "build/icon.png",
  "category": "Utility"
}
```

## 🎨 Adding Icons

### Icon Requirements
- **Windows**: `.ico` file (256x256 recommended)
- **macOS**: `.icns` file (512x512 recommended)
- **Linux**: `.png` file (512x512 recommended)

### Icon Setup
1. Create `build/` directory
2. Add icon files:
   ```
   build/
   ├── icon.ico    # Windows
   ├── icon.icns   # macOS
   └── icon.png    # Linux
   ```
3. Update `package.json`:
   ```json
   "win": { "icon": "build/icon.ico" },
   "mac": { "icon": "build/icon.icns" },
   "linux": { "icon": "build/icon.png" }
   ```

## 📋 Build Process Steps

### 1. Pre-Build Checklist
- [ ] All features tested in development
- [ ] Version number updated in `package.json`
- [ ] Dependencies installed (`npm install`)
- [ ] No build artifacts in repository
- [ ] Icons added (if custom icons desired)

### 2. Build Execution
```bash
# Clean previous builds
rm -rf dist/

# Build for target platform
npm run dist:win    # Windows
npm run dist:mac    # macOS
npm run dist:linux  # Linux
```

### 3. Post-Build Verification
- [ ] Build completed without errors
- [ ] Output files generated in `dist/`
- [ ] Installer runs correctly
- [ ] App launches after installation
- [ ] All features work in built version

## 🔍 Troubleshooting Build Issues

### Common Issues and Solutions

#### Build Fails with "electron-builder not found"
```bash
# Install electron-builder globally
npm install -g electron-builder

# Or use npx
npx electron-builder --win
```

#### Build Hangs or Takes Too Long
- Check internet connection (downloads Electron binaries)
- Verify sufficient disk space
- Close other applications to free memory

#### Icon Not Showing in Installer
- Verify icon file exists and is valid
- Check file path in `package.json`
- Ensure icon format matches platform requirements

#### Build Output Missing Files
- Check `files` array in build configuration
- Verify source files exist
- Check `.gitignore` for excluded files

### Debug Build Process
```bash
# Verbose build output
npm run dist:win -- --debug

# Build with specific Electron version
npm run dist:win -- --electron-version=37.2.6
```

## 📤 Distribution

### File Sharing
- **Windows**: Share `File Organizer Setup 1.0.0.exe`
- **macOS**: Share `File Organizer-1.0.0.dmg`
- **Linux**: Share `File Organizer-1.0.0.AppImage`

### Distribution Channels
1. **Direct Download**: Host installer files on your website
2. **GitHub Releases**: Upload to GitHub releases page
3. **Package Managers**: Consider Chocolatey (Windows), Homebrew (macOS)
4. **App Stores**: Microsoft Store, Mac App Store (requires additional setup)

### Update Distribution
- **Auto-Updater**: Implement electron-updater for automatic updates
- **Manual Updates**: Provide new installers for major versions
- **Delta Updates**: Use blockmap files for efficient updates

## 🔐 Code Signing (Advanced)

### Windows Code Signing
```json
"win": {
  "certificateFile": "path/to/certificate.p12",
  "certificatePassword": "password",
  "signingHashAlgorithms": ["sha256"],
  "timestampServer": "http://timestamp.digicert.com"
}
```

### macOS Code Signing
```json
"mac": {
  "identity": "Developer ID Application: Your Name (TEAM_ID)",
  "provisioningProfile": "path/to/profile.provisionprofile"
}
```

### Linux Code Signing
```json
"linux": {
  "signDmgs": true,
  "signAndEditExecutable": true
}
```

## 📊 Build Metrics

### Typical Build Times
- **Windows**: 2-5 minutes
- **macOS**: 3-6 minutes
- **Linux**: 2-4 minutes

### Build Sizes
- **Windows**: 80-100 MB (installer), 200-250 MB (portable)
- **macOS**: 100-150 MB (DMG)
- **Linux**: 80-120 MB (AppImage)

### Optimization Tips
- Exclude unnecessary files in build configuration
- Use compression for installers
- Consider code splitting for large applications
- Optimize dependencies (remove unused packages)

## 🚀 Continuous Integration

### GitHub Actions Example
```yaml
name: Build and Release
on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]
    
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install
    - run: npm run dist:${{ matrix.os == 'windows-latest' && 'win' || matrix.os == 'macos-latest' && 'mac' || 'linux' }}
    - uses: actions/upload-artifact@v2
      with:
        name: ${{ matrix.os }}-build
        path: dist/
```

## 📚 Additional Resources

### Documentation
- [electron-builder Configuration](https://www.electron.build/configuration/configuration)
- [NSIS Documentation](https://nsis.sourceforge.io/Docs/)
- [AppImage Documentation](https://docs.appimage.org/)

### Tools
- [electron-builder](https://www.electron.build/)
- [NSIS](https://nsis.sourceforge.io/)
- [AppImageKit](https://appimage.org/)

### Best Practices
- Test builds on clean virtual machines
- Verify installers work on target OS versions
- Keep build configurations in version control
- Document build requirements and dependencies
