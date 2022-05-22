const { getList, getDetail, newBlog, updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path, query, body } = req

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const author = query.author || ''
    const keyword = query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const data = getDetail(query.id)
    return new SuccessModel(data)
  }

  // 新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    const data = newBlog(body)
    return new SuccessModel(data)
  }

  // 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(query.id, body)
    if(result) {
      return new SuccessModel()
    }
    return new ErrorModel('更新博客失败')
  }

  // 删除博客
  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}

module.exports = handleBlogRouter
