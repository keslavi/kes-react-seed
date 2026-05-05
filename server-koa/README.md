# Server Setup

## Environment Variables

Create a `.env.local` file in the server-koa directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@yourdomain.com

# Client Configuration
CLIENT_URL=http://localhost:5173

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Development

To start the development server:

```bash
npm run dev
```

This will use the environment variables from `.env.local` file.

## Production

For production deployment, make sure to set all required environment variables in your hosting platform (e.g., Render.com). 