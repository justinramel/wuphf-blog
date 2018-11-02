const axios = require('axios')
const config = require('./config')
const token = config.medium.token

axios({
  method: 'get',
  url: 'https://api.medium.com/v1/me',
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(response => console.log(response))