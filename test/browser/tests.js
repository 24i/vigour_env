'use strict'

module.exports = function (inject) {
  var envPlugin

  it('require env', function () {
    envPlugin = require('../../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      envPlugin = new envPlugin.Constructor(inject)
    })
  }

  // after the init we receive back all the properties expected
  it('should receive back all the properties after the init', function (done) {
    envPlugin.val = true
    envPlugin.ready.is(true, () => {
      expect(envPlugin.bundleId.val).to.not.be.false
      expect(envPlugin.country.val).to.not.be.false
      expect(envPlugin.language.val).to.not.be.false
      expect(envPlugin.region.val).to.not.be.false
      expect(envPlugin.timezone.val).to.not.be.false
      expect(envPlugin.model.val).to.not.be.false
      expect(envPlugin.os.val).to.not.be.false
      expect(envPlugin.osVersion.val).to.not.be.false
      expect(envPlugin.appVersion.val).to.not.be.false
      expect(envPlugin.network.val).to.not.be.false
      expect(envPlugin.platform.val).to.not.be.false
      expect(envPlugin.device.val).to.not.be.false
      expect(envPlugin.browser.val).to.not.be.false
      done()
    })
  })
}
