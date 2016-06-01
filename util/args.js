'use strict'
const _ = require('lodash')

/**
 * Processes defaults and arguments to return a config object
 * @param {Object} conf Configuration object (defaults)
 * @param {Object} argv Arguments as processed by input handler
 * @returns {Object}
 */
const args = (conf, argv) => {
  const out = { resources: [], config: {} }
  // Grab loose array args if exist
  out.resources = argv._.length ? argv._ : null
  // Match up flags/short-flags with config vars
  _.forOwn(argv, (flagVal, flag) => {
    _.forOwn(conf, (entry, key) => {
      if (flag === key || flag === entry.alias) {
        out.config[key] = entry
        out.config[key].val = flagVal
      }
    })
  })
  return out
}

module.exports = args
