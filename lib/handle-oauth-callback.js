const { serialize } = require('cookie')
const fetchAccessToken = require('./fetch-access-token')

module.exports = async function handleOAuthCallback(req, res, { code, error }) {
  if (error) {
    res.statusCode = 500;
    res.end(`Failed to authorize: ${error}`)
    return;
  }

  try {
    const { access_token: accessToken } = await fetchAccessToken(code)
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': serialize('accessToken', accessToken, { path: '/' })
    });
    res.end();
  } catch (err) {
    res.writeHead(500);
    res.end(`Failed to authorize: ${err.message}`)
  }
}
