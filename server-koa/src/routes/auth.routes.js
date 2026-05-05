import Router from '@koa/router';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import config from '../config.js';
import emailService from '../services/emailService.js';

const router = new Router({ prefix: '/api/public/auth' });

// Register new user
router.post('/register', async (ctx) => {
  const { username, email, password, profile } = ctx.request.body;

  try {
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: 'Username or email already exists' };
      return;
    }

    // Validate password length
    if (password.length < 8) {
      ctx.status = 400;
      ctx.body = { message: 'Password must be at least 8 characters long' };
      return;
    }

    const user = new User({ 
      username, 
      email, 
      password,
      role: 'guest', // Default role
      profile: {
        ...profile,
        name: profile?.name || username
      }
    });
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    // Send welcome email with name if available
    try {
      const displayName = profile?.firstName 
        ? `${profile.firstName}${profile.lastName ? ' ' + profile.lastName : ''}`
        : username;
      await emailService.sendWelcomeEmail(email, displayName);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail registration if email fails
    }

    ctx.body = {
      token,
      user: user.toProfile()
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
});

// Login user
router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

  try {
    console.log('🔐 Login attempt for email:', email);
    
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      ctx.status = 401;
      ctx.body = { message: 'User not found' };
      return;
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', email);
      ctx.status = 401;
      ctx.body = { message: 'Invalid email or password' };
      return;
    }

    console.log('✅ Login successful for user:', email);

    const token = jwt.sign(
      { userId: user._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    ctx.body = {
      token,
      user: user.toProfile()
    };
  } catch (error) {
    console.error('❌ Login error:', error);
    ctx.status = 500;
    ctx.body = { message: 'An error occurred during login' };
  }
});

// Request password reset
router.post('/forgot-password', async (ctx) => {
  const { email } = ctx.request.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      config.jwt.secret,
      { expiresIn: '1h' }
    );

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken, user.username);
      ctx.body = { message: 'Password reset email sent' };
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      ctx.status = 500;
      ctx.body = { message: 'Failed to send password reset email' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: error.message };
  }
});

export default router; 