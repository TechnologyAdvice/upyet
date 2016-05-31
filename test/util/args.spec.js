'use strict'
const args = require('util/args')
const _ = require('lodash')

describe('args', () => {
  it('returns resources and config from arguments and default config', () => {
    const testArgs = { _: [ 'foo', 'bar' ], t: 5000 }
    const conf = { timeout: { alias: 't', val: 3000 } }
    const actual = args(conf, _.assignIn({}, testArgs))
    conf.timeout.val = 5000
    expect(actual).to.deep.equal({ resources: testArgs._, config: conf })
  })
})
