const h = require('escape-html')
const { CLIENT_ID } = process.env;

module.exports = function render(user) {
  return `
<!DOCTYPE html>
<html>
  <head></head>
  <body>
  ${user
    ? `<div>Logged in as ${h(user.username)} (${h(user.email)})</div>`
    : `<a href="http://localhost:3000/oauth/authorize?client_id=${h(CLIENT_ID)}">
        <button>Login with Zeit</button>
      </a>`
  }
  </body>
</html>
`
}
