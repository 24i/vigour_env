'use strict'

var tests = require('../tests')

describe('Env', function () {
  describe('Mock Platform Tests', function () {
    tests(require('./mockPlatform'), 'platform')
  })

  describe('Mock Native Tests', function () {
    tests(require('./mockNativeMethods'), 'native')
  })
})
