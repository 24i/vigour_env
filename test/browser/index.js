'use strict'

var tests = require('../tests')

describe('Env', function () {
  describe('Mock Plugin Tests', function () {
    tests(require('./platform'), 'platform')
  })

  describe('Mock Bridge Tests', function () {
    tests(require('./mockNativeMethods'), 'native')
  })
})
