'use strict'
require('gaston-tester')

var tests = require('../tests')
describe('Env', function () {
  this.timeout(25000)
  tests(null)
})
