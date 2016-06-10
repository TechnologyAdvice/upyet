'use strict'
const upyet = require('upyet.js')

describe('upyet', () => {
  describe('loadResources', () => {
    it('resolves with an empty array if no file is specified', () => {
      return upyet.loadResources({ file: null })
        .then((res) => {
          expect(res.length).to.equal(0)
        })
    })
    it('resolves with the contents of specified file', () => {
      return upyet.loadResources({ file: './test/fixtures/loadfile.txt' })
        .then((res) => {
          expect(res.length).to.be.above(1)
        })
    })
  })
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
