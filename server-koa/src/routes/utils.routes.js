import Router from '@koa/router';
import axios from 'axios';
import { getPlaceDetailsFromLink } from '../services/googleMaps.js';

const router = new Router({ prefix: '/api/utils' });

// Resolve shortened URL
router.get('/resolve-url', async (ctx) => {
  const { url } = ctx.query;
  
  if (!url) {
    ctx.throw(400, 'URL parameter is required');
  }

  try {
    console.log('🔗 Attempting to resolve URL:', url);
    
    const response = await axios.get(url, {
      maxRedirects: 5,
      validateStatus: null,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const finalUrl = response.request.res.responseUrl || url;
    console.log('✅ Resolved URL:', finalUrl);
    
    ctx.body = {
      resolvedUrl: finalUrl
    };
  } catch (error) {
    console.error('❌ Error resolving URL:', error.message);
    ctx.throw(500, `Failed to resolve URL: ${error.message}`);
  }
});

// Get place details from Google Maps link
router.get('/place-details', async (ctx) => {
  const { url } = ctx.query;

  if (!url) {
    ctx.throw(400, 'URL parameter is required');
  }

  try {
    const placeDetails = await getPlaceDetailsFromLink(url);
    ctx.body = placeDetails;
  } catch (error) {
    console.error('❌ Error getting place details:', error.message);
    ctx.throw(500, error.message);
  }
});

export default router; 