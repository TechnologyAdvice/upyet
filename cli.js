'use strict'
const _ = require('lodash')
const upyet = require('./upyet')
const defaults = require('./defaults')
const pkg = require('./package.json')

/* eslint no-console:0 */
const output = console.log

const argv = require('yargs')
  .usage('Usage: $0 [options] <resources>')
  .option('t', {
    alias: 'timeout',
    describe: 'Alloted time (ms) before failure is assumed'
  })
  .option('f', {
    alias: 'file',
    describe: 'File specifying resources'
  })
  .version(pkg.version)
  .help('help')
  .argv

const cli = {

  /**
   * Parse arguments to return setup/config object
   * @param {Object} args Arguments from CLI command
   * @returns {Object}
   */
  parseConfig: (args) => {
    const out = { config: {} }
    out.resources = args._ || []
    _.forOwn(defaults, (val, key) => {
      // Set default
      out.config[key] = val
      // If passed in CLI, override
      if (args[key] && key !== '_') {
        out.config[key] = args[key]
      }
    })
    return out
  },

  /**
   * Called when checks are successful
   * @param {Array} results
   */
  handleSuccess: (results) => {
    output('Done!', results)
  },

  /**
   * Called when checks fail
   * @param {Array} results
   */
  handleError: (results) => {
    output('Failed!', results)
  },

  /**
   * Calls fn to process args then calls upyet run method
   */
  run: () => {
    upyet.run(cli.parseConfig(argv))
      .then(cli.handleSuccess)
      .catch(cli.handleError)
  }
}

// Only run if actually call from CLI
if (!module.parent) cli.run()

module.exports = cli