'use strict'
const cli = require('cli.js')
const _ = require('lodash')

describe('cli', () => {
  describe('args', () => {
    it('returns resources and config from arguments and default config', () => {
      const argv = { _: [ 'foo', 'bar' ], t: 5000 }
      const actual = cli.args(argv)
      expect(actual).to.deep.equal({ resources: argv._, config: { timeout: 5000 } })
    })
  })
})
