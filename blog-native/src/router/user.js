const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
  const { method, path, body } = req

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = body
    return signIn(username, password).then((result) => {
      if (result.username) {
        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }
}

module.exports = handleUserRouter
