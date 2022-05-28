const http = require('http')
 http
 .createServer((req, res) => {
  if(req.method === 'POST') {
    req.pipe(res)
  }
})
.listen(8000)