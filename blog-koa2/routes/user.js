const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body

  ctx.body = {
    errno: 0,
    username,
    password
  }
})

router.get('/session-test', async (ctx, next) => {
  ctx.session.count = ctx.session.count || 0
  ctx.session.count++
  ctx.body = {
    errno: 0,
    count: ctx.session.count
  }
})

module.exports = router
