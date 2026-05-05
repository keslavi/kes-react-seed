import Router from '@koa/router';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const r = new Router();

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define data directory path
const DATA_DIR  = path.join(__dirname, '..', '..', 'data');
const TASK_FILE = path.join(DATA_DIR, 'task.iife.js');

// In-memory task data storage
let taskData = [];

// Get username from Windows authentication or environment
const getUsername = (ctx) => {
    // Try to get from request headers (Windows authentication)
    const username = ctx.headers['x-authenticated-user'] 
        || ctx.headers['remote-user']
        || process.env.USERNAME  // Windows environment variable
        || process.env.USER      // Unix environment variable
        || os.userInfo().username  // Node.js OS module
        || 'anonymous';
    
    return username;
};

// Load task data from IIFE file
const loadData = () => {
    try {
        if (!fs.existsSync(TASK_FILE)) {
            console.log('Task IIFE file does not exist, starting with empty data');
            taskData = [];
            return;
        }

        const fileContent = fs.readFileSync(TASK_FILE, 'utf8');
        taskData = eval(fileContent);

        console.log(`Task data loaded: ${taskData.length} tasks from IIFE file`);
    } catch (error) {
        console.error('Error loading task data from IIFE file:', error);
        taskData = [];
    }
};

// Initialize data on startup
loadData();

const readData = () => {
    return taskData;
}

const writeData = (data) => {
    taskData = data;

    // Write data back to IIFE file format
    try {
        const iifeContent = `(() => (${JSON.stringify(data, null, 2)}))()\n`;
        fs.writeFileSync(TASK_FILE, iifeContent, 'utf8');
        console.log('Task data persisted to IIFE file');
    } catch (error) {
        console.error('Error writing task data to IIFE file:', error);
        throw new Error('Failed to persist task data');
    }
}

r.get('/:id', async (ctx, next) => {
    const data = readData()
        .filter(function (data) { return data.id == ctx.params.id })[0];

    ctx.body = data;
})

r.get('/', async (ctx, next) => {
    const data = readData().filter(x=>x.id!==0);
    ctx.body = data
})

//NOTE: in the environments i frequently work in, PUT and DELETE aren't available
//UPSERT/DELETE
r.post('/', async (ctx, next) => {
    let data = readData();
    const req = ctx.request.body;
    const username = getUsername(ctx);

    if (req.delete) {
        console.log('delete')
        data = data.filter(x=>x.id !== req.id );
        req.deleted = true;
    }
    else if ((req.id || '0') !== '0') {
        console.log('update',req);
        const item = data.find(x=>x.id == req.id);
        if (item) {
          Object.keys(req).forEach((key) => {
            item[key] = req[key] || "";
          });
          // Update userAssigned on edit
          item.userAssigned = username;
          item.updatedAt = new Date().toISOString();
        }
    }
    else {
        const idNew = Math.max.apply(Math, data.map(function (o) { return o.id; })) + 1;
        console.log('adding', idNew);

        req.id=idNew;
        req.status = Number(req.status ||0);
        req.result = Number(req.result ||0);
        req.userAssigned = username;
        req.createdAt = new Date().toISOString();
        data.push(req);
    }

    writeData(data);

    req.success = true;

    ctx.body = req;
})

export default r; 
