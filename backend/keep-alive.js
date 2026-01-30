// Simple keep-alive script to prevent Render from sleeping
import fetch from 'node-fetch';

const keepAlive = async () => {
  try {
    const response = await fetch('https://student-profile-management-6k06.onrender.com/health');
    console.log('Keep-alive ping successful:', await response.text());
  } catch (error) {
    console.error('Keep-alive ping failed:', error.message);
  }
};

// Ping every 14 minutes (840000 ms)
setInterval(keepAlive, 840000);

// Initial ping
keepAlive();
