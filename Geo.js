// pages/api/geo.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    // Get client IP from request headers
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // Use a geolocation service (example using ipgeolocation.io)
    const apiKey = process.env.GEOLOCATION_API_KEY;
    const geoResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`);
    const geoData = await geoResponse.json();
    
    if (!geoData.country_code2) {
      throw new Error('Could not determine country');
    }
    
    res.status(200).json({
      country: geoData.country_code2,
      region: geoData.state_prov,
      city: geoData.city,
    });
    
  } catch (error) {
    console.error('Geolocation error:', error);
    res.status(500).json({
      error: error.message || 'Failed to determine location',
    });
  }
}