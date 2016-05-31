'use strict'
// Setup test suite resources
const chai = require('chai')
global.expect = chai.expect

// Better pathing; all relative to root
const path = require('path')
const mod = require('module')
process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
mod._initPaths()
