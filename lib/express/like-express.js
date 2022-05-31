const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])
    curRoutes.forEach((route) => {
      if (url.indexOf(route.path) === 0) {
        // url === '/api/get-cookie' && route.path === '/'
        // url === '/api/get-cookie' && route.path === '/api'
        // url === '/api/get-cookie' && route.path === '/api/get-cookie'
        stack = stack.concat(route.stack)
      }
    })
    return stack
  }

  /**
   * 核心 next 机制
   * @param {object} req
   * @param {object} res
   * @param {array} stack
   */
  handle(req, res, stack) {
    const next = () => {
      // 拿到匹配的第一个中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const stack = this.match(method, url)
      this.handle(req, res, stack)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = () => {
  return new LikeExpress()
}
