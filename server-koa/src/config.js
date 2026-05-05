import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

const config = {
  // Server settings
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // MongoDB settings
  mongodb: {
    uri: process.env.MONGODB_URI,
    options: {
      // Modern MongoDB driver options
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    }
  },

  // JWT settings
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Email settings
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
    defaultFrom: process.env.EMAIL_FROM
  },

  // Client URL for CORS
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  // Google Maps API configuration
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY
  }
};

export default config;
