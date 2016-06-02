'use strict'
const _ = require('lodash')
const upyet = require('./upyet')
const defaults = require('./defaults')
const pkg = require('./package.json')

const argv = require('yargs')
  .usage('Usage: $0 [options] <resources>')
  .option('t', {
    alias: 'timeout',
    describe: 'Alloted time (ms) before failure is assumed'
  })
  .version(pkg.version)
  .help('help')
  .argv;

const cli = {
  
  parseConfig: (args) => {
    const out = { config: {} }
    out.resources = args._ || null
    _.forOwn(defaults, (val, key) => {
      if (args[key] && key !== '_') {
        out.config[key] = args[key]
      }
    })
    return out
  },
  
  handleSuccess: (stats) => {
    output('Done!')
  },

  handleError: (stats) => {
    output('Failed!')
  },

  /**
   * Calls fn to process args then calls upyet run method
   */
  run: () => {
    upyet.run(opts.resources, opts.config)
      .then(cli.handleSuccess)
      .catch(cli.handleError)
  }
}

cli.run()

module.exports = cli

/* eslint no-console:0 */
const output = console.log;
