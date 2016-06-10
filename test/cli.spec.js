'use strict'
const cli = require('cli.js')

describe('cli', () => {
  const outputSpy = sinon.spy(cli, 'output')
  after(() => cli.output.restore())
  describe('parseConfig', () => {
    it('processes arguments against defaults to return config and resources', () => {
      const args = { _: [ 'foo' ], t: 1000, timeout: 1000 }
      const actual = cli.parseConfig(args)
      expect(actual).to.deep.equal({ timeout: 1000, retries: 30, file: null, resources: [ 'foo' ] })
    })
  })
  describe('handleSuccess', () => {
    it('outputs the result of a successful execution', () => {
      cli.handleSuccess({})
      expect(outputSpy).to.be.called
    })
  })
  describe('handleError', () => {
    it('outputs the result of a failed execution', () => {
      cli.handleError({})
      expect(outputSpy).to.be.called
    })
  })
})
