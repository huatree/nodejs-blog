const mysql = require('mysql2')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '28000',
  database: 'huatree_blog'
})

con.connect()

const sql = `insert into blogs (title, content, createtime, author) values ('标题C', '内容C', '1653276934576', 'lisi')`
con.query(sql, (error, result) => {
  if (error) throw error
  console.log('The solution is: ', result)
})

con.end()
