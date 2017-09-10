const { parse } = require('cookie')
const fetchUser = require('./fetch-user')
const render = require('./render')

module.exports = async function handle(req, res) {
  const { accessToken } = parse(req.headers.cookie || '')
  let user;

  if (accessToken) {
    try {
      user = (await fetchUser(accessToken)).user;
    } catch (err) {
      console.warn(`Failed to get user: ${err.message}`)
    }
  }

  res.end(render(user))
}
