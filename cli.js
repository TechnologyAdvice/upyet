'use strict'
const _ = require('lodash')
const upyet = require('./upyet')
const defaults = require('./defaults')
const pkg = require('./package.json')

const argv = require('yargs')
  .usage('Usage: $0 [options] <resources>')
  .option('r', {
    alias: 'retries',
    describe: 'Number of retries to make on connection'
  })
  .option('t', {
    alias: 'timeout',
    describe: 'Allotted time (ms) before failure is assumed'
  })
  .option('f', {
    alias: 'file',
    describe: 'File specifying resources'
  })
  .version(pkg.version)
  .help('help')
  .argv

const cli = {

  /* eslint no-console:0 */
  output: console.log,

  /**
   * Formats JSON output
   * @param {Object} out The objext to format
   * @returns {String}
   */
  formatOutput: (out) => '\n' + JSON.stringify(out, null, 4),

  /**
   * Handles exiting of running process
   * @param {Number} code The exit code
   */
  exitProcess: (code) => {
    // istanbul ignore next
    if (!module.parent) process.exit(code)
  },

  /**
   * Parse arguments to return setup/config object
   * @param {Object} args Arguments from CLI command
   * @returns {Object}
   */
  parseConfig: (args) => {
    const out = {}
    out.resources = args._ || []
    _.forOwn(defaults, (val, key) => {
      // Set default
      out[key] = val
      // If passed in CLI, override
      if (args[key] && key !== '_') {
        out[key] = args[key]
      }
    })
    return out
  },

  /**
   * Called when checks are successful
   * @param {Array} results
   */
  handleSuccess: () => {
    cli.output('Done!\n', cli.formatOutput(upyet.results))
    cli.exitProcess(0)
  },

  /**
   * Called when checks fail
   * @param {Array} results
   */
  handleError: () => {
    cli.output('Failed!\n', cli.formatOutput(upyet.results))
    cli.exitProcess(1)
  },

  /**
   * Calls fn to process args then calls upyet run method
   */
  run: () => {
    // istanbul ignore next
    process.on('SIGINT', () => {
      cli.output(cli.formatOutput(upyet.results))
      cli.exitProcess(130)
    })
    // istanbul ignore next
    process.stdout.write('Running')
    // istanbul ignore next
    const addDot = () => {
      process.stdout.write('.')
      setTimeout(addDot, 100)
    }
    // istanbul ignore next
    addDot()
    // istanbul ignore next
    upyet.run(cli.parseConfig(argv))
      .then(cli.handleSuccess)
      .catch(cli.handleError)
  }
}

// Only run if actually called from CLI
// istanbul ignore next
if (!module.parent) cli.run()

module.exports = cli
