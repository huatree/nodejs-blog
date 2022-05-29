const express = require('express')
const router = express.Router()
const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  return signIn(username, password).then((result) => {
    if (result.username) {
      req.session.username = result.username
      req.session.realname = result.realname
      return res.json(new SuccessModel(result))
    }
    res.json(new ErrorModel('登录失败'))
  })
})

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    return res.json({ errno: 0, msg: '测试登录成功' })
  }
  res.json({ errno: -1, msg: '未登录' })
})

module.exports = router
