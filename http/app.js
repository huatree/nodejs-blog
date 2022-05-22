const http = require('http')
const url = require('url')
http
  .createServer(function (req, res) {
    console.log('method', req.method)
    const { query } = url.parse(req.url, true)
    console.log(query)
    res.end(JSON.stringify(query))
  })
  .listen(8081)

console.log('Server running at http://127.0.0.1:8081/')
