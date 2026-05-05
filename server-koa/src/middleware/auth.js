import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import config from '../config.js';

export const authenticateToken = async (ctx, next) => {
  try {
    const authHeader = ctx.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      ctx.status = 401;
      ctx.body = { message: 'No token provided' };
      return;
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: 'User not found' };
      return;
    }

    ctx.user = user;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid token' };
  }
};

export const requireAdmin = async (ctx, next) => {
  if (ctx.user.role !== 'admin') {
    ctx.status = 403;
    ctx.body = { message: 'Admin access required' };
    return;
  }
  await next();
};

export const requireRole = (roles) => {
  return async (ctx, next) => {
    if (!roles.includes(ctx.user.role)) {
      ctx.status = 403;
      ctx.body = { message: 'Insufficient permissions' };
      return;
    }
    await next();
  };
}; 