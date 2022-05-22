const fs = require('fs')
const path = require('path')

function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    callback(JSON.parse(data.toString()))
  })
}

getFileContent('a.json', aData => {
  console.log('a data', aData)
  getFileContent(aData.next, bData => {
    console.log('b data', bData)
    getFileContent(bData.next, cData => {
      console.log('c data', cData)
    })
  })
})
