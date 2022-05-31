const xss = require('xss')
const { exec } = require('../db/mysql')

const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1`
  if (author) {
    sql += ` and author='${author}'`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ` order by createtime desc`
  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = Date.now()
  const sql = `insert into blogs (title, content, createtime, author) values ('${xss(title)}', '${xss(content)}', '${createtime}', '${author}')`
  const result = await exec(sql)
  return { id: result.insertId }
}

const updateBlog = async (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `update blogs set title='${xss(title)}', content='${xss(content)}' where id=${id}`
  const result = await exec(sql)
  if (result.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = async (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`
  const result = await exec(sql)
  if (result.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
