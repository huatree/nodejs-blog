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

!(async function readFileData() {
  const aData = await getFileContent('a.json')
  console.log('a data', aData)
  const bData = await getFileContent(aData.next)
  console.log('b data', bData)
  const cData = await getFileContent(bData.next)
  console.log('c data', cData)
})()
