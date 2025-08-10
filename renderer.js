document.addEventListener('DOMContentLoaded', () => {
    const folderPathInput = document.getElementById('folder-path');
    const selectFolderBtn = document.getElementById('select-folder-btn');
    const organizeBtn = document.getElementById('organize-btn');
    const logArea = document.getElementById('log-area');

    let selectedFolderPath = null;

    // Add log message to the log area
    function addLogMessage(message, type = 'info') {
        const logMessage = document.createElement('p');
        logMessage.className = `log-message ${type}`;
        logMessage.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logArea.appendChild(logMessage);
        logArea.scrollTop = logArea.scrollHeight;
    }

    // Clear log area
    function clearLog() {
        logArea.innerHTML = '';
    }

    // Handle folder selection
    selectFolderBtn.addEventListener('click', async () => {
        try {
            const folderPath = await window.electronAPI.selectFolder();
            if (folderPath) {
                selectedFolderPath = folderPath;
                folderPathInput.value = folderPath;
                organizeBtn.disabled = false;
                addLogMessage(`Selected folder: ${folderPath}`, 'success');
            }
        } catch (error) {
            addLogMessage(`Error selecting folder: ${error.message}`, 'error');
        }
    });

    // Handle organize button click
    organizeBtn.addEventListener('click', async () => {
        if (!selectedFolderPath) {
            addLogMessage('Please select a folder first', 'warning');
            return;
        }

        // Disable buttons during operation
        organizeBtn.disabled = true;
        selectFolderBtn.disabled = true;
        
        // Clear previous logs
        clearLog();
        addLogMessage('Starting file organization...', 'info');
        addLogMessage(`Target folder: ${selectedFolderPath}`, 'info');

        try {
            const result = await window.electronAPI.organizeFiles(selectedFolderPath);
            
            if (result.success) {
                addLogMessage(result.message, 'success');
                addLogMessage('File organization completed successfully!', 'success');
            } else {
                addLogMessage(result.message, 'error');
            }
        } catch (error) {
            addLogMessage(`Error during organization: ${error.message}`, 'error');
        } finally {
            // Re-enable buttons
            organizeBtn.disabled = false;
            selectFolderBtn.disabled = false;
        }
    });

    // Initialize
    addLogMessage('File Organizer ready. Select a folder to begin.', 'info');
});

