'use strict'

module.exports = function (inject, type) {
  var envPlugin, bridge

  it('require env', function () {
    envPlugin = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      envPlugin = new envPlugin.Constructor(inject)
    })
  }

  if (type.label === 'bridge') {
    bridge = window.vigour.native.bridge
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
      done()
    })
  })

  // we should be able to listen for properties changes
  it('should listen for property changes', function (done) {
    var previous = envPlugin.network.val
    envPlugin.network.on(() => {
      expect(envPlugin.network.val).to.not.equal(previous)
      expect(envPlugin.network.val).to.be.false
      done()
    })
    if (type === 'platform') {
      envPlugin.platform.emit('change', {network: false})
    } else if (type.label === 'bridge') {
      let event = type.events.changeNetworkFalse
      bridge.receive(event.eventType, event.data, 'env')
    } else {
      alert('try to change your network by switching it off, we expect network to be setted to false')
    }
  })

  // we should be able to listen for pause and resume events
  it('should listen for pause and resume events', function (done) {
    envPlugin.paused.on((data) => {
      if (data === false) {
        return
      } else if (data === true) {
        done()
      }
    })
    if (type === 'platform') {
      envPlugin.platform.emit('pause')
      setTimeout(() => {
        envPlugin.platform.emit('resume')
      })
    } else if (bridge) {
      bridge.receive('pause', true, 'env')
      setTimeout(() => {
        bridge.receive('resume', true, 'env')
      })
    } else {
      alert('try to put the application in background and then to the foreground again')
    }
  })

  // we should be able to listen for button events, we can receive them like
  // eg: {button: 'volup'}
  it('should be able to listen for volup, voldown and back button press', function (done) {
    var buttons = []
    envPlugin.button.on((data) => {
      var button = data
      if (buttons.indexOf(button) < 0) {
        buttons.push(button)
      }
      if (buttons.length === 3) done()
    })
    if (type === 'platform') {
      envPlugin.platform.emit('button', 'volup')
      setTimeout(() => {
        envPlugin.platform.emit('button', 'voldown')
        setTimeout(() => {
          envPlugin.platform.emit('button', 'back')
        })
      })
    } else if (bridge) {
      bridge.receive('button', 'volup', 'env')
      setTimeout(() => {
        bridge.receive('button', 'voldown', 'env')
        setTimeout(() => {
          bridge.receive('button', 'back', 'env')
        })
      })
    } else {
      alert('close this and press the volume up button, then volume down, then back')
    }
  })
}
