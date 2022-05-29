const express = require('express')
const router = express.Router()
const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  signIn(username, password).then((result) => {
    if (result.username) {
      req.session.username = result.username
      req.session.realname = result.realname
      return res.json(new SuccessModel(result))
    }
    res.json(new ErrorModel('登录失败'))
  })
})

router.get('/signOut', (req, res, next) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.json(new SuccessModel('退出成功'))
    }
    res.json(new SuccessModel('系统异常'))
  })
})

module.exports = router
