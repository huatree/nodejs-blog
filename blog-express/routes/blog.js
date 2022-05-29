const express = require('express')
const router = express.Router()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const signInValid = require('../middleware/signInValid')

router.get('/list', (req, res, next) => {
  const { query, session } = req
  if (query.isadmin === '1') {
    if (!session.username) {
      return res.json(new ErrorModel('尚未登录'))
    }
    query.author = session.username
  }
  getList(query.author || '', query.keyword || '').then((result) => {
    res.json(new SuccessModel(result))
  })
})

router.get('/detail', (req, res, next) => {
  getDetail(req.query.id).then((result) => {
    res.json(new SuccessModel(result))
  })
})

router.post('/new', signInValid, (req, res, next) => {
  req.body.author = req.session.username
  newBlog(req.body).then((result) => {
    res.json(new SuccessModel(result))
  })
})

router.post('/update', signInValid, (req, res, next) => {
  updateBlog(req.query.id, req.body).then((result) => {
    if (result) {
      return res.json(new SuccessModel())
    }
    res.json(new ErrorModel('更新博客失败'))
  })
})

router.post('/del', signInValid, (req, res, next) => {
  delBlog(req.query.id, req.session.username).then((result) => {
    if (result) {
      return res.json(new SuccessModel())
    }
    res.json(new ErrorModel('删除博客失败'))
  })
})

module.exports = router
