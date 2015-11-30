'use strict'

module.exports = function (inject) {
  var env

  it('require env', function () {
    env = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      env = new env.Constructor(inject)
    })
    it('should contain a target', function () {
      expect(env.target).to.exist
    })
  }
}
