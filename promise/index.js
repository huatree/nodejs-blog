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

async function readAData() {
  const aData = await getFileContent('a.json')
  return aData
}

async function test() {
  const aData = await readAData()
  console.log(aData)
}

test()
