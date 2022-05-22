const http = require('http')
http
  .createServer(function (req, res) {
   if(req.method === 'POST') {
     console.log('content-type', req.headers['content-type'])
     let postData = ''
     req.on('data', chunk => {
       postData += chunk.toString()
     })
     req.on('end', () => {
       console.log('postData', postData)
       res.end('hello world')
     })
   } else {
      res.end('no POST')
   }
  })
  .listen(8081)

console.log('Server running at http://127.0.0.1:8081/')
