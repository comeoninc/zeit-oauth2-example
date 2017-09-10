const fetch = require('node-fetch')
const { stringify } = require('querystring')
const { CLIENT_ID, CLIENT_SECRET }= process.env;

module.exports = async function fetchAccessToken(code) {
  const res = await fetch('https://api.zeit.co/oauth/access_token', {
    method: 'POST',
    body: stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code
    })
  });

  const body = await res.json();

  if (!res.ok) {
    const err = new Error(body.error_description || 'Failed to fetch accessToken');
    err.res = res;
    err.body = body;
    throw err;
  }

  return body;
}
