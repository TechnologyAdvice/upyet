'use strict'
const cli = require('cli.js')

describe('cli', () => {
  describe('parseConfig', () => {
    it('processes arguments against defaults to return config and resources', () => {
      const args = { _: [ 'foo' ], t: 1000, timeout: 1000 }
      const actual = cli.parseConfig(args)
      expect(actual).to.deep.equal({ config: { timeout: 1000, retries: 30, file: null }, resources: [ 'foo' ] })
    })
  })
})
