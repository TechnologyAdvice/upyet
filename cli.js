'use strict'
const _ = require('lodash')
const upyet = require('./upyet')

const cli = {

  defaultConfig: {
    timeout: {
      alias: 't',
      val: 3000
    },
    file: {
      alias: 'f',
      val: null
    }
  },

  /**
   * Processes defaults and arguments to return a config object
   * @param {Object} conf Configuration object (defaults)
   * @returns {Object}
   */
  args: (argv) => {
    const out = { config: {} }
    // Grab loose array args as resources if exist
    out.resources = argv._.length ? argv._ : null
    // Match up flags/short-flags with config vars
    _.forOwn(argv, (flagVal, flag) => {
      _.forOwn(cli.defaultConfig, (entry, key) => {
        if (flag === key || flag === entry.alias) {
          out.config[key] = flagVal
        }
      })
    })
    return out
  },

  handleSuccess: (stats) => {
    console.log('Done!')
  },

  handleError: (stats) => {
    console.log('Failed!')
  },

  /**
   * Calls fn to process args then calls upyet run method
   */
  run: () => {
    const setup = cli.args(require('minimist')(process.argv.slice(2)))
    return upyet.run(setup.resources, setup.config)
      .then(cli.handleSuccess)
      .catch(cli.handleError)
  }
}

module.exports = cli
