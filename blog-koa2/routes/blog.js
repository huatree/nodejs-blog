const router = require('koa-router')()

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const signInValid = require('../middleware/signInValid')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  const { query, session } = ctx
  if (query.isadmin === '1') {
    if (!session.username) {
      return (ctx.body = new ErrorModel('尚未登录'))
    }
    query.author = session.username
  }
  const result = await getList(query.author || '', query.keyword || '')
  ctx.body = new SuccessModel(result)
})

router.get('/detail', async (ctx, next) => {
  const result = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(result)
})

router.post('/new', signInValid, async (ctx, next) => {
  const { request, session } = ctx
  request.body.author = session.username
  const result = await newBlog(request.body)
  ctx.body = new SuccessModel(result)
})

router.post('/update', signInValid, async (ctx, next) => {
  const { query, request } = ctx
  const result = await updateBlog(query.id, request.body)
  if (result) {
    return (ctx.body = new SuccessModel())
  }
  ctx.body = new ErrorModel('更新博客失败')
})

router.post('/del', signInValid, async (ctx, next) => {
  const result = await delBlog(ctx.query.id, ctx.session.username)
  if (result) {
    return (ctx.body = new SuccessModel())
  }
  ctx.body = new ErrorModel('删除博客失败')
})

module.exports = router
