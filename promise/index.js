const fs = require('fs')
const path = require('path')

function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

getFileContent('a.json')
  .then(aData => {
    console.log('a data', aData)
    return getFileContent(aData.next)
  })
  .then(bData => {
    console.log('b data', bData)
    return getFileContent(bData.next)
  })
  .then(cData => {
    console.log('c data', cData)
  })
  