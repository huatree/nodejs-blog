const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './data.txt')

const content = '这是写入的内容\n'
const opt = {
  flag: 'a' // 追加写入。覆盖用 'w'
}

fs.writeFile(fileName, content, opt, (err) => {
  if (err) throw err
  console.log('写入成功')
})
