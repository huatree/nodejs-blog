var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const path = require('path')
const fs = require('fs')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { redisClient } = require('./db/redis')

var blogRouter = require('./routes/blog')
var userRouter = require('./routes/user')

var app = express()

if(process.env.NODE_ENV !== 'prod') {
  app.use(logger('dev'))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'Cy61v!97_e@#0',
    cookie: {
      path: '/', // 默认配置，可不写
      httpOnly: true, // 默认配置，可不写
      maxAge: 24 * 60 * 60 * 1000
    },
    store: new RedisStore({ client: redisClient })
  })
)

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in dev
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
