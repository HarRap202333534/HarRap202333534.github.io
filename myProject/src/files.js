import fs from 'fs';
import path from 'path';

function assetsMap(sourceDir, directoryDepth = 0, hidden = false) {
    let fileData = [];
    const newDepth = directoryDepth - 1;

    try {
        const files = fs.readdirSync(sourceDir);

        files.forEach(file => {
            const fullPath = path.join(sourceDir, file);

            // Ignore '.', '..' and hidden files
            if (!file.trim() || (!hidden && file.startsWith('.'))) {
                return;
            }

            const stats = fs.statSync(fullPath);

            if (stats.isDirectory() && (directoryDepth < 1 || newDepth > 0)) {
                fileData[file] = assetsMap(fullPath, newDepth, hidden);
            } else {
                fileData.push(file);
            }
        });
    } catch (err) {
        console.error('Error reading directory:', err);
        return false;
    }

    return fileData;
}

// Example usage: Replace 'resources' with your directory path
const result = assetsMap('resources', 1, false);
console.log(JSON.stringify(result, null, 2));
