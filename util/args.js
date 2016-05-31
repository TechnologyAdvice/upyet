'use strict'
const _ = require('lodash')

/**
 * Processes defaults and arguments to return a config object
 * @param {Object} conf Configuration object (defaults)
 * @param {Object} argv Arguments as processed by input handler
 * @returns {Object}
 */
const args = (config, argv) => {
  // Grab loose array args if exist
  const resources = argv._.length ? argv._ : null
  // Don't need this anymore
  delete argv._
  // Match up flags/short-flags with config vars
  _.forOwn(argv, (flagVal, flag) => {
    _.forOwn(config, (entry, key) => {
      if (flag === key || flag === entry.alias) {
        entry.val = flagVal
      }
    })
  })
  return { resources, config }
}

module.exports = args
