const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './data.txt')

fs.readFile(fileName, (err, data) => {
  if (err) throw err
  console.log(data.toString())
})

