const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set, del } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const { method, path, body, sessionId, session } = req

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = body
    return signIn(username, password).then((result) => {
      if (result.username) {
        session.username = result.username
        session.realname = result.realname
        console.log('set-redis', sessionId, session)
        set(sessionId, session)
        return new SuccessModel(result)
      }
      return new ErrorModel('登录失败')
    })
  }

  // 退出登录
  if (method === 'GET' && path === '/api/user/signOut') {
    let isDel = del(sessionId)
    return isDel.then((result) => {
      if (result) {
        return new SuccessModel('退出成功')
      } else {
        return new ErrorModel('退出失败')
      }
    })
  }
}

module.exports = handleUserRouter
