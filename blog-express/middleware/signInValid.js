const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
  if(req.session.username) {
    return next()
  }
  
  res.json(new ErrorModel('未登录'))
}