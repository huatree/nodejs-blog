const opts = require('./a')
const _ = require('lodash')

const sum = opts.add(10, 20)
const result = opts.mul(10, 20)
console.log(sum, result)

const arr = _.concat([1, 2], 3)
console.log(arr)
