'use strict'
const net = require('net')
// const Promise = require('bluebird')

const upyet = {

  // Holds resources to check
  resources: [],

  /**
   * Parses a resource to split host and port
   * @param {String} resource The resource to split and parse
   * @returns {Array}
   */
  parseResource: (resource) => {
    if (resource.indexOf(':') >= 0) {
      const res = resource.split(':')
      return [ parseInt(res[1], 10), res[0] ]
    }
    throw new Error(`Resource (${resource}) must include port designation`)
  },

  /**
   * Returns a net connection
   * @param {String} resource The resource with which to create connection
   */
  createConn: (resource) => net.createConnection.apply(null, upyet.parseResource(resource)),

  run: (resources, cfg) => {

  }

}

module.exports = upyet

/*
Promise.map(resources, (res) => {
  const testConn = () => {
    const conn = createConn(res)
    conn.on('connect', () => {

    })
    conn.on('error', () => {

      setTimeout(testConn, 100)
    })
  }
})
*/
