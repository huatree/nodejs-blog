const router = require('koa-router')()

const { signIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const result = await signIn(username, password)
  if (result.username) {
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    return (ctx.body = new SuccessModel(result))
  }
  ctx.body = new ErrorModel('登录失败')
})

router.get('/signOut', async (ctx, next) => {
  if (ctx.session) {
    ctx.session = null
    return (ctx.body = new SuccessModel('退出成功'))
  }
  ctx.body = new SuccessModel('系统异常')
})

module.exports = router
