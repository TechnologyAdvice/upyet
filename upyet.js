'use strict'
const fs = require('fs')
const net = require('net')
Promise.promisifyAll(fs)
// const Promise = require('bluebird')

const upyet = {
  
  /**
   * Reads in resources from file
   * @param {Object} config The config object
   * @returns {Object] promise
   */
  readResourcesFile: (config) => !cfg.file ? Promise.resolve([]) : fs.readFileAsync(file),

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
  
  testResource: (resource, config) => {
    return new Promise((resolve, reject) => {
      let log = 0
      const testConn = () => {
        const conn = net.createConnection.apply(null, upyet.parseResource(resource))
        conn.on('connect', resolve)
        conn.on('error', () => {
          log++
          if (log >= config.retries) reject()
          setTimeout(testConn, config.timeout)
        })
      }
    })
  },

  /**
   * Runs the upyet process
   * @param {Object} config The config object
   * @returns {Object} promise
   */
  run: (config) => {
    return upyet.readResourcesFile(config)
      .then(res => {
        config.resources = config.resources.concat(res)
        if (!config.resources.length) {
          throw new Error('No resources supplied')
        }
        return Promise.map(config.resources, res => {
          return upyet.testResource(res, config)
        })
      })
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
