const Koa = require('./like-koa2')
const app = new Koa()

// logger

app.use(async (ctx, next) => {
  console.log('1 - start')
  await next()
  const rt = ctx['X-Response-Time']
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`)
  console.log('1 - end')
})

// x-response-time

app.use(async (ctx, next) => {
  console.log('2 - start')
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx['X-Response-Time'] = `${ms}ms`
  console.log('2 - end')
})

// response

app.use(async (ctx) => {
  console.log('3 - start')
  ctx.res.end('Hello World')
  console.log('3 - end')
})

app.listen(3001)
