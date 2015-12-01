'use strict'

var tests = require('./tests')

describe('Env', function () {
  describe('Mock Plugin Tests', function () {
    tests(require('./pluginMock'))
  })

  describe('Mock Bridge Tests', function () {
    tests(require('./bridgeMock'))
  })
})
