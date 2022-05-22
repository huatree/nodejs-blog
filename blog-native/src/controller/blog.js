const getList = (author, keyword) => {
  // mock
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: '1653219335012',
      author: '张三'
    },
    {
      id: 1,
      title: '标题B',
      content: '内容B',
      createTime: '1653219360194',
      author: '李四'
    }
  ]
}

const getDetail = (id) => {
  // mock
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '1653219335012',
    author: '张三'
  }
}

module.exports = {
  getList,
  getDetail
}