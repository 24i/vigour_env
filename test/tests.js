'use strict'

module.exports = function (inject, type) {
  var envPlugin

  var bridge = type && type.label === 'mockBridge'
    ? type
    : false

  it('require env', function () {
    console.log('------- require dat envPlugin')
    envPlugin = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      console.log('------- change dat other envPlugin')
      envPlugin = new envPlugin.Constructor(inject)
    })
  }

  // after the init we receive back all the properties expected
  it('should receive back all the properties after the init', function (done) {
    console.log('---------- init dat')
    envPlugin.val = true
    envPlugin.bundleId.once(function () {
      expect(envPlugin.bundleId.val).to.not.be.false
      expect(envPlugin.country.val).to.not.be.false
      expect(envPlugin.language.val).to.not.be.false
      expect(envPlugin.region.val).to.not.be.false
      expect(envPlugin.timezone.val).to.not.be.false
      expect(envPlugin.model.val).to.not.be.false
      expect(envPlugin.os.val).to.not.be.false
      expect(envPlugin.osVersion.val).to.not.be.false
      expect(envPlugin.appVersion.val).to.not.be.false
      expect(envPlugin.network.val).to.not.equal('none')
      done()
    })
  })

  // we should be able to listen for properties changes
  it('should listen for property changes', function (done) {
    var previous = envPlugin.network.val
    // envPlugin.network.on(() => {
    //   expect(envPlugin.network.val).to.not.equal(previous)
    //   expect(envPlugin.network.val).to.euqal('none')
    //   done()
    // })
    setTimeout(function () {
      expect(envPlugin.network.val).to.not.equal(previous)
      done()
    }, 5000)
    if (type === 'platform') {
      envPlugin._platform.emit('change', {network: 'none'})
    } else if (bridge) {
      let event = bridge.mock.events.changeNetworkFalse
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
      envPlugin._platform.emit('pause')
      setTimeout(() => {
        envPlugin._platform.emit('resume')
      })
    } else if (bridge) {
      let event = bridge.mock.events.resume
      bridge.receive(event.eventType, event.data, 'env')
      setTimeout(() => {
        event = bridge.mock.events.pause
        bridge.receive(event.eventType, event.data, 'env')
      })
    } else {
      alert('try to put the application in background and then to the foreground again')
    }
  })

  // we should be able to listen for button events, we can receive them like
  // eg: {button: 'volup'}
  it('should be able to listen for volup, voldown and back button press', function (done) {
    var buttons = {
      volUp: 0,
      volDown: 0,
      back: 0
    }
    envPlugin.button.on((data) => {
      buttons[data] = buttons[data] + 1
      if (buttons.volUp && buttons.volDown && buttons.back) {
        expect(buttons.volUp + buttons.volDown + buttons.back).to.equal(3)
        done()
      }
    })
    if (type === 'platform') {
      envPlugin._platform.emit('button', 'volUp')
      setTimeout(() => {
        envPlugin._platform.emit('button', 'volDown')
        setTimeout(() => {
          envPlugin._platform.emit('button', 'back')
        })
      })
    } else if (bridge) {
      let event = bridge.mock.events.volUpPressed
      bridge.receive(event.eventType, event.data, 'env')
      setTimeout(() => {
        event = bridge.mock.events.volDownPressed
        bridge.receive(event.eventType, event.data, 'env')
        setTimeout(() => {
          event = bridge.mock.events.backPressed
          bridge.receive(event.eventType, event.data, 'env')
        })
      })
    } else {
      alert('close this and press the volume up button, then volume down, then back')
    }
  })
}
