var http = require('http')
http
  .createServer(function (req, res) {
    // mock log
    console.log('cur time', Date.now())
    // mock error
    console.error('error', Date.now())

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(
      JSON.stringify({
        errno: 0,
        msg: 'pm2 test server'
      })
    )
  })
  .listen(8000)

console.log('Server running at http://127.0.0.1:8000/')
