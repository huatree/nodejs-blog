const http = require('http')
const serverHandle = require('../app')
http.createServer(serverHandle).listen(8081)

console.log('Server running at http://127.0.0.1:8081/')
