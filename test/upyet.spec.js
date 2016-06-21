'use strict'
const upyet = require('upyet.js')
const service = require('test/fixtures/service')

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
  describe('testResource', () => {
    let testService
    const defaultConfig = {
      timeout: 100,
      retries: 5
    }
    afterEach(() => {
      testService.close()
    })
    it('resolves when a service is available and connects', () => {
      testService = service(8989, 0)
      return upyet.testResource('localhost:8989', defaultConfig)
    })
    it('resolves after retrying when connection becomes available', () => {
      testService = service(8989, 300)
      return upyet.testResource('localhost:8989', defaultConfig)
    })
    it('rejects after retrying when connection does not become available', () => {
      return upyet.testResource('localhost:8989', defaultConfig).catch(() => true)
    })
  })
  describe('run', () => {
    let testService1
    let testService2
    after(() => {
      testService1.close()
      testService2.close()
    })
    it('throws an error if no resources are supplied', () => {
      return upyet.run({ resources: [] }).catch(() => true)
    })
    it('runs check/s based on config object', () => {
      testService1 = service(8989, 200)
      testService2 = service(8990, 100)
      return upyet.run({
        resources: [ 'localhost:8989', 'localhost: 8990' ],
        config: {
          timeout: 100,
          retries: 5
        }
      })
    })
  })
})
