import Router from '@koa/router';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = new Router({ prefix: '/api' });

// Protected route - requires authentication
router.get('/profile', authenticateToken, async (ctx) => {
  ctx.body = ctx.user.toProfile();
});

// Admin route - requires authentication and admin role
router.get('/admin', authenticateToken, requireAdmin, async (ctx) => {
  ctx.body = {
    message: 'Admin access granted',
    user: ctx.user.toProfile()
  };
});

export default router; 