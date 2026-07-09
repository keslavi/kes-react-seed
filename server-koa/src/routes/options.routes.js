import Router from '@koa/router';
import { loadMockData, writeMockData } from '../services/mock-data.service.js';

const r = new Router();

// In-memory options storage
let optionsData = {};

const loadOptions = () => {
    try {
        optionsData = loadMockData('options', { defaultValue: {} });
        console.log('Options loaded');
    } catch (error) {
        console.error('Error loading options:', error);
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

    try {
        writeMockData('options', data, { indent: 4 });
        console.log('Options persisted to IIFE file');
    } catch (error) {
        console.error('Error writing options:', error);
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