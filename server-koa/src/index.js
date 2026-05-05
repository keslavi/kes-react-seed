import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import logger from 'koa-logger';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import config from './config.js';
import { errorHandler } from './middleware/errorHandler.js';
import { decryptChangedIifeFiles } from './services/mock-data.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

async function main() {
  // Ensure local IIFE files reflect any changed encrypted mock files before routes initialize
  decryptChangedIifeFiles();

  // Dynamic imports for route modules
  const [
    { default: authRoutes },
    { default: protectedRoutes },
    { default: utilsRoutes },
    { default: taskRoutes },
    { default: optionsRoutes },
    { default: badRequestRoutes },
  ] = await Promise.all([
    import('./routes/auth.routes.js'),
    import('./routes/protected.routes.js'),
    import('./routes/utils.routes.js'),
    import('./routes/tasks.routes.js'),
    import('./routes/options.routes.js'),
    import('./routes/badRequest.routes.js'),
  ]);

  const app = new Koa();
  const publicRouter = new Router({ prefix: '/api/public' });
  const apiRouter    = new Router({ prefix: '/api' });

  // Middleware
  app.use(errorHandler);
  app.use(logger());
  app.use(bodyParser());

  app.use(cors({
    origin: config.clientUrl,
    credentials: true,
  }));

  // API root
  apiRouter.get('/', (ctx) => { ctx.body = 'Hello World (api)'; });
  publicRouter.get('/', (ctx) => { ctx.body = 'Hello World (api/public)'; });

  // Public data routes
  publicRouter.use('/tasks',      taskRoutes.routes());
  publicRouter.use('/options',    optionsRoutes.routes());
  publicRouter.use('/badRequest', badRequestRoutes.routes());

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());
  app.use(publicRouter.routes());
  app.use(publicRouter.allowedMethods());

  app.use(utilsRoutes.routes());
  app.use(protectedRoutes.routes());
  app.use(authRoutes.routes());

  // Static files / SPA fallback
  app.use(serve(path.join(__dirname, '..', 'public')));

  app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/api')) {
      await next();
    } else {
      ctx.type = 'html';
      ctx.body = fs.createReadStream(path.join(__dirname, '..', 'public', 'index.html'));
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`.`);
    console.log(`******************************************************************************************`);
    console.log(`📁 !IMPORTANT: if you need to check in test data changes, you MUST do npm run mock-encrypt`);
    console.log('   - npm run mock-encrypt        # encrypt changed .iife.js -> data/enc/*.enc.json');
    console.log('   - npm run mock-decrypt        # decrypt changed data/enc/*.enc.json -> .iife.js');
    console.log('   - npm run mock-sync           # sync newest *.enc.json between data/enc and ../seed/public/mock/enc');
    console.log('   - npm run mock-encrypt-force  # force encrypt all .iife.js');
    console.log('   - npm run mock-decrypt-force  # force decrypt all .enc.json');
    console.log(`******************************************************************************************`);
  });
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
