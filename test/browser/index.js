'use strict'

var tests = require('../tests')

describe('Env', function () {
  describe('Mock Platform Tests', function () {
    tests(require('./mockPlatform'), 'platform')
  })

  describe('Mock Native Tests', function () {
    var mockBridge = require('./mockNativeMethods')
    var nativePlatform = require('../../lib/platform/native')
    tests(nativePlatform, mockBridge)
  })
})
