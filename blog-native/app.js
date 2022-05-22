const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  res.setHeader('content-type', 'application/json')
  req.path = req.url.split('?')[0]

  const blogData = handleBlogRouter(req, res)
  if(blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handleUserRouter(req, res)
  if(userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 未命中路由，返回404
  res.writeHead(404, {'content-type': 'text/plain'})
  res.write('404 Not Found\n')
  res.end()
}

module.exports = serverHandle