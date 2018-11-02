const fs = require('fs')
const parseMD = require('parse-md').default
const axiosLib = require('axios')

const config = require('./config')
const token = config.medium.token

const fileContents = fs.readFileSync('test.md', 'utf8')
const {
  metadata,
  content
} = parseMD(fileContents)

console.log(metadata)
console.log(content)

const axios = axiosLib.create({
  baseURL: 'https://api.medium.com/v1',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

axios({
    method: 'get',
    url: '/me'
  })
  .then(response => response.data.data.id)
  .then(id => axios({
    method: 'post',
    url: `/users/${id}/posts`,
    data: {
      title: metadata.title,
      contentFormat: 'markdown',
      content,
      publishStatus: 'draft'
    }
  }))