const upyet = require('index.js')

describe('upyet', () => {
  describe('parseResource', () => {
    it('returns an array containing the port and resource host', () => {
      const actual = upyet.parseResource('somehost.com:8888')
      expect(actual).to.deep.equal([ 8888, 'somehost.com' ])
    })
    it('throws an error if the resource is incorrectly formatted', () => {
      expect(upyet.parseResource.bind(null, 'somehost.com')).to.throw('Resource (somehost.com) must include port designation')
    })
  })
})