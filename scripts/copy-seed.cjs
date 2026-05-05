#!/usr/bin/env node
/**
 * copy-seed.js - File synchronization script
 * 
 * Specifications:
 * - Ask for source directory (remember as default for next time)
 * - Copy only newer files that also exist in src to target (this file's location)
 * - Use .gitignore to exclude files from the copy
 * - also exclude .git folder from the copy
 * - Only show summary output, not detailed
 * - Copy files that exist in src and trg, but are newer in trg to ./trg/../$(dirname)-unedited
 * - List the files that were copied to the unedited folder
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const configFile = path.join(__dirname, 'copy-seed-config.json');
const trgPath = path.resolve(__dirname, '..');
const trgDirName = path.basename(trgPath);
const srcUneditedPath = path.join(path.dirname(trgPath), `${trgDirName}-unedited`);

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    red: '\x1b[31m'
};

function colorLog(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Function to get or set default source path
function getDefaultSourcePath() {
    if (fs.existsSync(configFile)) {
        try {
            const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
            return config.DefaultSourcePath || '';
        } catch (error) {
            console.warn(`Could not read config file: ${error.message}`);
        }
    }
    return '';
}

function setDefaultSourcePath(path) {
    try {
        const config = {
            DefaultSourcePath: path,
            LastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    } catch (error) {
        console.warn(`Could not save config file: ${error.message}`);
    }
}

// Function to get .gitignore exclusions
function getGitignoreExclusions(srcPath) {
    const gitignorePath = path.join(srcPath, '.gitignore');
    const exclusions = [];
    
    if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8').split('\n');
        for (const line of gitignoreContent) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                // Convert .gitignore patterns to exclusions
                if (trimmedLine.startsWith('/')) {
                    exclusions.push(trimmedLine.substring(1));
                } else if (trimmedLine.endsWith('/')) {
                    exclusions.push(trimmedLine.slice(0, -1));
                } else {
                    exclusions.push(trimmedLine);
                }
            }
        }
    }
    
    // Add common exclusions
    exclusions.push('.git', 'node_modules', '.vscode', '.idea', 'dist', 'build');
    
    return exclusions;
}

// Function to check if path should be excluded
function shouldExclude(filePath, exclusions) {
    for (const exclusion of exclusions) {
        if (filePath.includes(exclusion) || path.basename(filePath) === exclusion) {
            return true;
        }
    }
    return false;
}

// Function to perform file sync (equivalent to robocopy)
function syncFiles(src, trg, exclusions) {
    colorLog(`Synchronizing files from '${src}' to '${trg}'...`, 'cyan');
    colorLog(`Exclusions: ${exclusions.join(', ')}`, 'gray');
    
    let copiedCount = 0;
    let skippedCount = 0;
    
    try {
        // Get all files in source that also exist in target
        const srcFiles = getAllFiles(src, exclusions);
        const filesToSync = [];
        
        for (const srcFile of srcFiles) {
            const relativePath = path.relative(src, srcFile);
            const trgFile = path.join(trg, relativePath);
            
            // Check if file exists in target
            if (fs.existsSync(trgFile)) {
                // Check if source file is newer
                const srcStats = fs.statSync(srcFile);
                const trgStats = fs.statSync(trgFile);
                
                if (srcStats.mtime > trgStats.mtime) {
                    filesToSync.push({ src: srcFile, trg: trgFile, relative: relativePath });
                } else {
                    skippedCount++;
                }
            }
        }
        
        // Copy newer files
        for (const file of filesToSync) {
            const destDir = path.dirname(file.trg);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            fs.copyFileSync(file.src, file.trg);
            copiedCount++;
        }
        
        colorLog(`Sync completed: ${copiedCount} files copied, ${skippedCount} files skipped`, 'green');
        return { copied: copiedCount, skipped: skippedCount };
        
    } catch (error) {
        colorLog(`Error during sync: ${error.message}`, 'red');
        throw error;
    }
}

// Function to get all files recursively
function getAllFiles(dir, exclusions = []) {
    const files = [];
    
    function traverse(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const relativePath = path.relative(dir, fullPath);
            
            // Check exclusions
            if (shouldExclude(relativePath, exclusions)) continue;
            
            const stats = fs.statSync(fullPath);
            if (stats.isDirectory()) {
                traverse(fullPath);
            } else {
                files.push(fullPath);
            }
        }
    }
    
    traverse(dir);
    return files;
}

// Function to copy newer files from target back to unedited folder
function copyNewerFilesToUnedited(src, trg, srcUnedited, exclusions = []) {
    if (!fs.existsSync(srcUnedited)) {
        fs.mkdirSync(srcUnedited, { recursive: true });
        colorLog(`Created ${trgDirName}-unedited directory: ${srcUnedited}`, 'green');
    }
    
    const copiedFiles = [];
    
    // Get all files in target that also exist in source
    const trgFiles = getAllFiles(trg, exclusions);
    
    for (const trgFile of trgFiles) {
        const relativePath = path.relative(trg, trgFile);
        const srcFile = path.join(src, relativePath);
        
        if (fs.existsSync(srcFile)) {
            // Compare modification times
            const trgStats = fs.statSync(trgFile);
            const srcStats = fs.statSync(srcFile);
            
            if (trgStats.mtime > srcStats.mtime) {
                const destPath = path.join(srcUnedited, relativePath);
                const destDir = path.dirname(destPath);
                
                if (!fs.existsSync(destDir)) {
                    fs.mkdirSync(destDir, { recursive: true });
                }
                
                fs.copyFileSync(trgFile, destPath);
                copiedFiles.push(relativePath);
            }
        }
    }
    
    return copiedFiles;
}

// Function to prompt for user input
function promptInput(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

// Main execution
async function main() {
    try {
        // Clear screen
        console.clear();
        
        // Check for help flag
        if (process.argv.includes('--help') || process.argv.includes('-h')) {
            colorLog('copy-seed.js - File synchronization script', 'green');
            console.log('');
            colorLog('Usage: node copy-seed.js [SourcePath]', 'yellow');
            console.log('');
            colorLog('Parameters:', 'yellow');
            colorLog('  SourcePath    Optional source directory path', 'white');
            colorLog('  --help, -h    Show this help message', 'white');
            console.log('');
            colorLog('Features:', 'yellow');
            colorLog('  - Remembers last used source directory', 'white');
            colorLog('  - Efficient file copying with exclusions', 'white');
            colorLog('  - Respects .gitignore exclusions', 'white');
            colorLog(`  - Creates ${trgDirName}-unedited folder for reverse synchronization`, 'white');
            process.exit(0);
        }
        
        // Get source path
        let srcPath = process.argv[2] || '';
        
        if (!srcPath) {
            const defaultSource = getDefaultSourcePath();
            const prompt = defaultSource 
                ? `Enter source directory path (default: '${defaultSource}'): `
                : 'Enter source directory path: ';
            
            srcPath = await promptInput(prompt);
            
            if (!srcPath && defaultSource) {
                srcPath = defaultSource;
            }
        }
        
        // Validate source path
        if (!srcPath || !fs.existsSync(srcPath)) {
            colorLog(`Invalid or empty source path: '${srcPath}'`, 'red');
            process.exit(1);
        }
        
        srcPath = path.resolve(srcPath);
        
        // Save as default for next time
        setDefaultSourcePath(srcPath);
        
        colorLog(`Source: ${srcPath}`, 'green');
        colorLog(`Target: ${trgPath}`, 'green');
        colorLog(`${trgDirName}-unedited: ${srcUneditedPath}`, 'green');
        console.log('');
        
        // Get exclusions from .gitignore
        const exclusions = getGitignoreExclusions(srcPath);
        
        // Perform initial sync (source to target)
        const syncResult = syncFiles(srcPath, trgPath, exclusions);
        
        console.log('');
        
        // Copy newer files from target back to unedited folder
        colorLog('Checking for files newer in target...', 'cyan');
        const copiedFiles = copyNewerFilesToUnedited(srcPath, trgPath, srcUneditedPath, exclusions);
        
        if (copiedFiles.length > 0) {
            colorLog(`Copied ${copiedFiles.length} newer files to ${trgDirName}-unedited:`, 'yellow');
            for (const file of copiedFiles) {
                colorLog(`  ${file}`, 'white');
            }
        } else {
            colorLog('No files were newer in target directory.', 'green');
        }
        
        console.log('');
        colorLog('Synchronization complete!', 'green');
        
    } catch (error) {
        colorLog(`An error occurred: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { main, syncFiles, copyNewerFilesToUnedited };