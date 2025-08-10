const fs = require('fs').promises;
const path = require('path');

// 🔹 Mapping of file extensions to categories
const categories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    Videos: ['.mp4', '.mov', '.avi', '.mkv', '.flv'],
    Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
    Music: ['.mp3', '.wav', '.aac', '.flac'],
    Archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    Others: [] // fallback
};

async function organizeFiles(targetFolder) {
    try {
        // 🔹 Ensure the target folder exists
        try {
            await fs.access(targetFolder);
        } catch (error) {
            throw new Error(`Target folder does not exist: ${targetFolder}`);
        }

        // 🔹 Read all files in the target folder
        const files = await fs.readdir(targetFolder);
        
        if (files.length === 0) {
            throw new Error('The selected folder is empty. Add some files to organize!');
        }

        console.log(`🚀 Starting to organize ${files.length} files...\n`);

        // Process files sequentially to avoid race conditions
        for (const file of files) {
            const filePath = path.join(targetFolder, file);
            
            try {
                const stats = await fs.stat(filePath);
                
                // Skip directories
                if (stats.isDirectory()) {
                    console.log(`📁 Skipping directory: ${file}`);
                    continue;
                }

                const ext = path.extname(file).toLowerCase();

                // Find matching category
                let category = 'Others';
                for (const [key, exts] of Object.entries(categories)) {
                    if (exts.includes(ext)) {
                        category = key;
                        break;
                    }
                }

                // Create category folder if it doesn't exist
                const categoryPath = path.join(targetFolder, category);
                try {
                    await fs.access(categoryPath);
                } catch (error) {
                    await fs.mkdir(categoryPath);
                    console.log(`📁 Created category folder: ${category}`);
                }

                // Move file into the category folder
                const newPath = path.join(categoryPath, file);
                
                // Check if file already exists in destination
                try {
                    await fs.access(newPath);
                    console.log(`⚠️  File already exists in ${category}/: ${file}`);
                    continue;
                } catch (error) {
                    // File doesn't exist, safe to move
                }

                await fs.rename(filePath, newPath);
                console.log(`✅ Moved ${file} → ${category}/`);
                
            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error.message);
            }
        }

        console.log('\n🎉 File organization complete!');
        
    } catch (error) {
        console.error('❌ Fatal error:', error.message);
        throw error;
    }
}

// Export the function for use in other modules
module.exports = { organizeFiles };

// If this file is run directly (not imported), use the default messy-folder
if (require.main === module) {
    const defaultTargetFolder = path.join(__dirname, 'messy-folder');
    organizeFiles(defaultTargetFolder).catch(console.error);
}
