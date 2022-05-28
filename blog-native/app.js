const url = require('url')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toUTCString()
}

const serverHandle = (req, res) => {
  res.setHeader('content-type', 'application/json')
  req.path = req.url.split('?')[0]
  req.query = url.parse(req.url, true).query
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    req.cookie[arr[0].trim()] = arr[1].trim()
  })
  let userId = req.cookie.userid
  let needSetCookie = false
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  req.sessionId = userId
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData === null) {
        set(req.sessionId, {})
        req.session = {}
      } else {
        req.session = sessionData
      }
      return getPostData(req)
    })
    .then((postData) => {
      req.body = postData

      const blogData = handleBlogRouter(req, res)
      if (blogData) {
        blogData.then((result) => {
          if (needSetCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          res.end(JSON.stringify(result))
        })
        return
      }

      const userData = handleUserRouter(req, res)
      if (userData) {
        userData.then((result) => {
          if (needSetCookie) res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          res.end(JSON.stringify(result))
        })
        return
      }

      // 未命中路由，返回404
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.write('404 Not Found\n')
      res.end()
    })
}

module.exports = serverHandle
