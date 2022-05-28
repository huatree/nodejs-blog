const fs = require('fs')
const path = require('path')
const http = require('http')

const fileName1 = path.resolve(__dirname, 'data.txt')
http
  .createServer((req, res) => {
    if (req.method === 'GET') {
      const readStream = fs.createReadStream(fileName1)
      readStream.pipe(res)
    }
  })
  .listen(8000)
