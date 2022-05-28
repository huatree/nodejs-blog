const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './data.txt')

console.log(fs.existsSync(fileName))
