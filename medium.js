const fs = require('fs')
const parseMD = require('parse-md').default
const axios = require('axios')

const config = require('./config')
const token = config.medium.token

const fileContents = fs.readFileSync('test.md', 'utf8')
const {
  metadata,
  content
} = parseMD(fileContents)

console.log(metadata)
console.log(content)

axios({
  method: 'get',
  url: 'https://api.medium.com/v1/me',
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(response => console.log(response.data.data.id))