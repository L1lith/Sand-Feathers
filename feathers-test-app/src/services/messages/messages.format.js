//const { ObjectId } = require('bson')
const { ObjectID } = require('mongodb')
const { SandFeathers } = require('../../../../dist/SandFeathers')

const format = new SandFeathers({
  text: String
})

module.exports = format
