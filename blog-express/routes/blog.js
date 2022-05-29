const express = require('express')
const router = express.Router()
const { getList, getDetail } = require('../controller/blog')
const { SuccessModel } = require('../model/resModel')

router.get('/list', function (req, res, next) {
  const { query } = req
  return getList(query.author || '', query.keyword || '').then((result) => {
    res.json(new SuccessModel(result))
  })
})

router.get('/detail', function (req, res, next) {
  return getDetail(req.query.id).then((result) => {
    res.json(new SuccessModel(result))
  })
})

module.exports = router
