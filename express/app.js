const express = require('express')

const app = express()

app.use((req, res, next) => {
  console.log('req start', req.method, req.url)
  next()
})

app.use((req, res, next) => {
  // exec mock cookie
  req.cookie = {
    userId: '123def'
  }
  next()
})

app.use((req, res, next) => {
  // exec mock post data
  // async
  setTimeout(() => {
    req.body = {
      a: 1,
      b: 2
    }
    next()
  })
})

app.use('/api', (req, res, next) => {
  console.log('use route "/api" ')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get route "/api" ')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post route "/api" ')
  next()
})

app.get('/api/get-cookie', (req, res, next) => {
  console.log('get route "/api/get-cookie"')
  res.json({
    errno: 0,
    data: req.cookie
  })
})

app.post('/api/post-data', (req, res, next) => {
  console.log('get route "/api/post-data"')
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use((req, res, next) => {
  console.log('exec 404')
  res.json({
    errno: -1,
    message: '404 not found'
  })
})

app.listen(3000, () => {
  console.log('this is running http://localhost:3000')
})
