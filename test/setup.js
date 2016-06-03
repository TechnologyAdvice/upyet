'use strict'
// Block cli from running automatically
process.env.TEST = true
// Setup test suite resources
const chai = require('chai')
const sinon = require('sinon')
const schai = require('sinon-chai')
global.expect = chai.expect
global.sinon = sinon
chai.use(schai)

// Better pathing; all relative to root
const path = require('path')
const mod = require('module')
process.env.NODE_PATH = path.join(__dirname, '..') + path.delimiter + (process.env.NODE_PATH || '')
mod._initPaths()
