'use strict'
const _ = require('lodash')

/**
 * Processes defaults and arguments to return a config object
 * @param {Object} conf Configuration object (defaults)
 * @param {Object} argv Arguments as processed by input handler
 * @returns {Object}
 */
const args = (conf, argv) => {
  const config = _.assignIn({}, conf)
  const args = _.assignIn({}, argv)
  // Grab loose array args if exist
  const resources = args._.length ? args._ : null
  // Don't need this anymore
  delete args._
  // Match up flags/short-flags with config vars
  _.forOwn(args, (flagVal, flag) => {
    _.forOwn(config, (entry, key) => {
      if (flag === key || flag === entry.alias) {
        entry.val = flagVal
      }
    })
  })
  return { resources, config }
}

module.exports = args
