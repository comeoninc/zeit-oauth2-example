const fetch = require('node-fetch')
const { CLIENT_ID, CLIENT_SECRET }= process.env;

module.exports = async function fetchUser(accessToken) {
  const res = await fetch('https://api.zeit.co/www/user', {
    headers: {
      Authorization: `bearer ${accessToken}`
    }
  });

  const body = await res.json();

  if (!res.ok) {
    const err = new Error(body.error.message || 'Failed to fetch user');
    err.res = res;
    err.body = body;
    throw err;
  }

  return body;
}
