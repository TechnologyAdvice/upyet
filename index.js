'use strict'
const upyet = require('./upyet')
const args = require('./util/args')
const _ = require('lodash')
// Determine whether we're loading from CLI or module
const cliMode = !module.parent

// Default config object
const config = {
  timeout: {
    alias: 't',
    val: 3000
  },
  file: {
    alias: 'f',
    val: null
  }
}

if (cliMode) {
  const argv = require('minimist')(process.argv.slice(2))

}
