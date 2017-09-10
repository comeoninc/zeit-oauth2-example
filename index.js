const { createServer } = require('http')
const { parse } = require('url')
const handle = require('./lib/handle')
const handleOAuthCallback = require('./lib/handle-oauth-callback')
const { PORT = 3000 } = process.env;

createServer((req, res) => {
  const { pathname, query } = parse(req.url, true)
  if (pathname === '/oauth/callback') {
    handleOAuthCallback(req, res, query)
  } else {
    handle(req, res)
  }
}).listen(PORT, () => {
  console.log(`> Ready on http://localhost:${PORT}`)
})
