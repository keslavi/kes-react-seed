import Router from '@koa/router';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const r = new Router();

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define data directory path
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

// In-memory options storage
let optionsData = {};

// Load options from IIFE file
const loadOptions = () => {
    try {
        
        const optionsFilePath = path.join(DATA_DIR, 'options.iife.js');
        const optionsFileContent = fs.readFileSync(optionsFilePath, 'utf8');
        optionsData = eval(optionsFileContent);
        console.log('Options loaded from IIFE file');
    } catch (error) {
        console.error('Error loading options from IIFE file:', error);
        // Fallback to empty options
        optionsData = {};
    }
};

// Initialize options on startup
loadOptions();

const readOptions = () => {
    return optionsData;
}

const writeOptions = (data) => {
    optionsData = data;
    
    // Write data back to IIFE file format
    try {
        const optionsFilePath = path.join(DATA_DIR, 'options.iife.js');
        const iifeContent = `(() => (${JSON.stringify(data, null, 4)}))()\n`;
        fs.writeFileSync(optionsFilePath, iifeContent, 'utf8');
        console.log('Options persisted to IIFE file');
    } catch (error) {
        console.error('Error writing options to IIFE file:', error);
        throw new Error('Failed to persist options');
    }
}

r.get('/', async (ctx, next) => {
    const options = readOptions();
    ctx.body = options;
});

r.get('/:key', async (ctx, next) => {
    const options = readOptions();
    const value = options[ctx.params.key];
    if (value === undefined) {
        ctx.status = 404;
        ctx.body = { message: 'Option not found' };
        return;
    }
    ctx.body = { [ctx.params.key]: value };
});

r.post('/', async (ctx, next) => {
    const options = readOptions();
    const updates = ctx.request.body;

    // Update options
    Object.keys(updates).forEach(key => {
        options[key] = updates[key];
    });

    writeOptions(options);
    ctx.body = options;
});

r.post('/:key', async (ctx, next) => {
    const options = readOptions();
    const { key } = ctx.params;
    const value = ctx.request.body.value;

    options[key] = value;
    writeOptions(options);
    ctx.body = { [key]: value };
});

export default r; 