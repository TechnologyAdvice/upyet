'use strict'
const http = require('http')

/**
 * Allows creating of service after a delay
 * @param {Number} port The port designation of http service
 * @param {Number} delay Milliseconds to delay starting the service
 * @returns {Object} http server object
 */
const service = (port, delay) => {
  delay = delay || 0
  const srv = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Ok')
  })

  setTimeout(() => {
    srv.listen(port)
    console.log(`Service on ${port} started`)
  }, delay)

  return srv
}

module.exports = service
