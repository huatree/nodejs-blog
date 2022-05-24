const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toUTCString()
}

const handleUserRouter = (req, res) => {
  const { method, path, query, cookie } = req

  // 登录
  if (method === 'GET' && path === '/api/user/login') {
    const { username, password } = query
    return signIn(username, password).then((result) => {
      if (result.username) {
        res.setHeader('Set-Cookie', `username=${result.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (cookie.username) {
      return Promise.resolve(
        new SuccessModel({
          username: cookie.username
        })
      )
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter
