import Joi from 'joi';

export const validateRequest = (schema) => {
  return async (ctx, next) => {
    try {
      const { error } = schema.validate(ctx.request.body);
      if (error) {
        ctx.status = 400;
        ctx.body = {
          message: 'Validation error',
          details: error.details.map(detail => detail.message)
        };
        return;
      }
      await next();
    } catch (err) {
      ctx.status = 500;
      ctx.body = {
        message: 'Internal server error during validation',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      };
    }
  };
};

// Common validation schemas
export const schemas = {
  user: {
    register: Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      profile: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        name: Joi.string()
      })
    }),
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  },
  show: {
    create: Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
      location: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().valid('draft', 'published', 'cancelled').default('draft')
    }),
    update: Joi.object({
      name: Joi.string(),
      date: Joi.date(),
      location: Joi.string(),
      description: Joi.string(),
      status: Joi.string().valid('draft', 'published', 'cancelled')
    })
  }
}; 