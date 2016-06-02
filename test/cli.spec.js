'use strict'
const cli = require('cli.js')
const _ = require('lodash')

describe('cli', () => {
  describe.only('parseConfig', () => {
    it('processes arguments against defaults to return config and resources', () => {
      const args = { _: [ 'foo' ], t: 1000, timeout: 1000 }
      const actual = cli.parseConfig(args)
      expect(actual).to.deep.equal({ config: { timeout: 1000 }, resources: [ 'foo' ] })
    })
  })
})
