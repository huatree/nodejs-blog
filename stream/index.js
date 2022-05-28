const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)
// 监听流动的数据
readStream.on('data', (chunk) => {
  console.log(chunk.toString())
})
// 数据流动结束后的打印
readStream.on('end', () => {
  console.log('copy done')
})
