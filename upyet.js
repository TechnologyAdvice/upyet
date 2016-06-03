'use strict'
const fs = require('fs')
const net = require('net')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

const upyet = {
  
  results: {},

  /**
   * Reads in resources from file or resolves empty array
   * @param {Object} config The config object
   * @returns {Object] promise
   */
  loadResources: (config) => !config.file ? Promise.resolve([]) : fs.readFileAsync(config.file),

  /**
   * Parses a resource to split host and port
   * @param {String} resource The resource to split and parse
   * @returns {Array}
   */
  parseResource: (resource) => {
    if (resource.indexOf(':') < 0) throw new Error(`Resource (${resource}) must include port designation`)
    const res = resource.split(':')
    return [ parseInt(res[1], 10), res[0] ]
  },

  /**
   * Runs tests against resources for config'd tries x timeout
   * @param {String} resource The resource to test
   * @param {Object} config The run config
   * @returns {Object} promise
   */
  testResource: (resource, config) => {
    return new Promise((resolve, reject) => {
      let log = 0
      const testConn = () => {
        const conn = net.createConnection.apply(null, upyet.parseResource(resource))
        conn.on('connect', () => {
          upyet.results[resource] = { retries: log, time: (log*config.config.timeout), result: 'connected' }
          resolve()
        })
        conn.on('error', () => {
          log++
          if (log >= config.config.retries) {
            upyet.results[resource] = { retries: log, time: (log*config.config.timeout), result: 'failed' }
            reject()
          }
          setTimeout(testConn, config.config.timeout)
        })
      }
      testConn()
    })
  },

  /**
   * Runs the upyet process
   * @param {Object} config The config object
   * @returns {Object} promise
   */
  run: (config) => {
    return upyet.loadResources(config)
      .then(resources => {
        config.resources = config.resources.concat(resources)
        if (!config.resources.length) throw new Error('No resources supplied')
        return Promise.map(config.resources, res => upyet.testResource(res, config))
      })
  }

}

module.exports = upyet
