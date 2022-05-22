const http = require('http')
const url = require('url')
http
  .createServer(function (req, res) {
    const method = req.method
    const path = req.url.split('?')[0]
    const { query } = url.parse(req.url, true)
    res.setHeader('content-type', 'application/json')
    
    let resData = {
      method,
      url,
      path,
      query
    }

    if(method === 'GET') {
      res.end(JSON.stringify(resData))
    }
    if(method === 'POST') {
      let postData = ''
      req.on('data', chunk => {
        postData += chunk.toString()
      })
      req.on('end', () => {
        resData.data = postData
        res.end(JSON.stringify(resData))
      })
    }
  })
  .listen(8081)

console.log('Server running at http://127.0.0.1:8081/')
