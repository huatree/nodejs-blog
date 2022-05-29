const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const signInValid = (session) => {
  if (!session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const { method, path, query, body, session } = req

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let author = query.author || ''
    if(query.isadmin === '1') {
      if(signInValid(session)) {
        return signInValid(session)
      }
      author = session.username
    }
    return getList(author, query.keyword || '').then((result) => {
      return new SuccessModel(result)
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    return getDetail(query.id).then((result) => {
      return new SuccessModel(result)
    })
  }

  // 新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    if(query.isadmin === '1' &&  signInValid(session)) {
      return signInValid(session)
    }
    body.author = session.username
    return newBlog(body).then((result) => {
      return new SuccessModel(result)
    })
  }

  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    if(query.isadmin === '1' &&  signInValid(session)) {
      return signInValid(session)
    }
    return updateBlog(query.id, body).then((result) => {
      if (result) {
        return new SuccessModel()
      }
      return new ErrorModel('更新博客失败')
    })
  }

  // 删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    if(query.isadmin === '1' &&  signInValid(session)) {
      return signInValid(session)
    }
    return delBlog(query.id, session.username).then((result) => {
      if (result) {
        return new SuccessModel()
      }
      return new ErrorModel('删除博客失败')
    })
  }
}

module.exports = handleBlogRouter
