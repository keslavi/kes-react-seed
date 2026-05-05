import { Client } from '@googlemaps/google-maps-services-js';
import config from '../config.js';
import axios from 'axios';

const client = new Client({});

// Extract coordinates and place name from Google Maps URL
const extractPlaceInfo = (url) => {
  // Extract coordinates
  const coordsMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!coordsMatch) return null;

  const lat = parseFloat(coordsMatch[1]);
  const lng = parseFloat(coordsMatch[2]);
  
  // Extract place name
  const placeMatch = url.match(/place\/([^/@]+)/);
  const placeName = placeMatch ? 
    decodeURIComponent(placeMatch[1].replace(/\+/g, ' ')) : 
    null;

  return {
    coordinates: [lng, lat], // MongoDB uses [longitude, latitude]
    name: placeName,
    location: { lat, lng }
  };
};

// Get address details from coordinates using OpenStreetMap's Nominatim
const getAddressFromCoordinates = async (lat, lng) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon: lng,
        format: 'json',
        addressdetails: 1
      },
      headers: {
        'User-Agent': 'SongRequest/1.0'
      }
    });

    const address = response.data.address;
    return {
      street: `${address.house_number || ''} ${address.road || ''}`.trim(),
      city: address.city || address.town || address.village || '',
      state: address.state || '',
      zip: address.postcode || '',
    };
  } catch (error) {
    console.error('❌ Geocoding error:', error);
    return null;
  }
};

// Get place details from Google Maps link
export const getPlaceDetailsFromLink = async (mapsLink) => {
  try {
    console.log('🔍 Processing Google Maps link:', mapsLink);
    
    // Extract basic info from URL
    const placeInfo = extractPlaceInfo(mapsLink);
    if (!placeInfo) {
      throw new Error('Could not extract place information from URL');
    }

    console.log('📍 Extracted place info:', placeInfo);

    // Get address details from coordinates
    const addressDetails = await getAddressFromCoordinates(placeInfo.location.lat, placeInfo.location.lng);
    console.log('📍 Address details:', addressDetails);

    return {
      name: placeInfo.name,
      address: addressDetails || {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      location: {
        coordinates: placeInfo.coordinates,
        mapsLink: mapsLink
      }
    };
  } catch (error) {
    console.error('❌ Google Maps processing error:', error);
    throw new Error(`Failed to process Google Maps link: ${error.message}`);
  }
}; 