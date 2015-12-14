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
  it('should set plugin as ready after init', function (done) {
    envPlugin.val = true
    envPlugin.ready.is(true, function () {
      done()
    })
  })

  it('should receive bundleId property after the init', function (done) {
    envPlugin.bundleId.once(function () {
      expect(envPlugin.bundleId.val).to.not.be.false
      done()
    })
  })

  it('should receive country property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.country.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive language property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.language.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive region property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.region.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive timezone property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.timezone.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive model property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.model.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive os property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.os.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive osVersion property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.osVersion.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive appVersion property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.appVersion.val).to.not.be.false
      done()
    }, 300)
  })

  it('should receive network property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.network.val).to.not.equal('none')
      done()
    }, 300)
  })

  // we should be able to listen for pause and resume events
  it('should listen for pause and resume events', function (done) {
    envPlugin.paused.on((data) => {
      if (data === false) {
        alert('resume false')
        return
      } else if (data === true) {
        alert('resume true')
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

  // we should be able to listen for properties changes
  it('should listen for property changes', function (done) {
    var previous = envPlugin.network.val
    envPlugin.network.on(() => {
      expect(envPlugin.network.val).to.not.equal(previous)
      expect(envPlugin.network.val).to.equal('none')
      done()
    })
    if (type === 'platform') {
      envPlugin._platform.emit('change', {network: 'none'})
    } else if (bridge) {
      console.log('----- RECEIVE')
      let event = bridge.mock.events.changeNetworkFalse
      bridge.receive(event.eventType, event.data, 'env')
    } else {
      alert('try to change your network by switching it off, we expect network to be setted to false')
    }
  })
}
