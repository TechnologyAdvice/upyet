/* eslint no-console: 0 */
'use strict'
const upyet = require('./index')

const testConfig = {
  resources: [ 'google.com:80', 'foo.bar:443' ],
  config: {
    retries: 3,
    timeout: 10
  }
}

upyet(testConfig).then(() => {
  console.log('Yay!')
}).catch(() => {
  console.log('Boo!')
})
