const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
  const { method, path, query, cookie } = req

  // 登录
  if (method === 'GET' && path === '/api/user/login') {
    const { username, password } = query
    return signIn(username, password).then((result) => {
      if (result.username) {
        res.setHeader('Set-Cookie', `username=${result.username}; path=/; httpOnly`)
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }

  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (cookie.username) {
      return Promise.resolve(new SuccessModel({
        username: cookie.username
      }))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter
