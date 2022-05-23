const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path, query, body } = req

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = query.author || ''
    const keyword = query.keyword || ''
    return getList(author, keyword).then((result) => {
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
    const data = newBlog(body)
    return new SuccessModel(data)
  }

  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(query.id, body)
    if (result) {
      return new SuccessModel()
    }
    return new ErrorModel('更新博客失败')
  }

  // 删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    const result = delBlog(query.id)
    if (result) {
      return new SuccessModel()
    }
    return new ErrorModel('删除博客失败')
  }
}

module.exports = handleBlogRouter
