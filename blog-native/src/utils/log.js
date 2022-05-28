const fs = require('fs')
const path = require('path')

function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

function accessLog(log) {
  writeLog(createWriteStream('access.log'), log)
}

function errorLog(log) {
  writeLog(createWriteStream('error.log'), log)
}

function eventLog(log) {
  writeLog(createWriteStream('event.log'), log)
}

module.exports = {
  accessLog,
  errorLog,
  eventLog
}
