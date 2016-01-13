'use strict'
var moment = require('moment')

module.exports = function (inject, type) {
  var envPlugin

  var bridge = type && type.label === 'mockBridge'
    ? type
    : false

  it('require env', function () {
    envPlugin = require('../lib')
  })

  if (inject) {
    it('create instance with mock properties', function () {
      envPlugin = new envPlugin.Constructor(inject)
      envPlugin.val = true
    })
  }

  // after the init we receive back all the properties expected
  it('should set plugin as ready after init', function (done) {
    this.timeout(25000)
    envPlugin.ready.is(true, function () {
      done()
    })
  })

  it('should receive bundleId property after the init', function (done) {
    setTimeout(function () {
      expect(envPlugin.bundleId.val).to.not.be.false
      done()
    }, 300)
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
      expect(moment(envPlugin.timezone.val, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid()).to.be.true
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
  it('should be able to listen for volup and voldown button press', function (done) {
    // console.clear()
    console.log('\n\n\n\n\n\n ------------ start dat test...')
    var buttons = {
      volUp: 0,
      volDown: 0
    }
    envPlugin.button.set({
      on: {
        data: {
          testing (data) {
            console.error('--------- button on', data)
            console.log('BUTTONS?', JSON.stringify(buttons))
            console.log('????????', buttons, data, buttons[data])
            buttons[data] = buttons[data] + 1
            console.log('buttons?', JSON.stringify(buttons))
            if (buttons.volUp && buttons.volDown) {
              console.log('got both?', buttons)
              console.error('----------- REVMOVE DAT LISTNER!')
              envPlugin.button.off('data', 'testing')
              expect(buttons.volUp + buttons.volDown).to.equal(2)
              console.log('\n\n\n\n\n\n ------------ end dat test...')
              done()
            }
            console.log('buttons?', JSON.stringify(buttons))
          }
        }
      }
    })

    if (type === 'platform') {
      envPlugin._platform.emit('button', 'volUp')
      setTimeout(() => {
        envPlugin._platform.emit('button', 'volDown')
      })
    } else if (bridge) {
      let event = bridge.mock.events.volUpPressed
      console.log('>> event 1', event)
      bridge.receive(event.eventType, event.data, 'env')
      setTimeout(() => {
        event = bridge.mock.events.volDownPressed
        console.log('>> event 2', event)
        bridge.receive(event.eventType, event.data, 'env')
      })
    } else {
      alert('close this and press the volume up button, then volume down')
    }
  })

  // we should be able to listen for properties changes
  it('should listen for property changes', function (done) {
    this.timeout(25000)
    var previous = envPlugin.network.val
    envPlugin.network.on((data) => {
      expect(envPlugin.network.val).to.not.equal(previous)
      done()
    })
    if (type === 'platform') {
      envPlugin._platform.emit('change', {network: 'none'})
    } else if (bridge) {
      let event = bridge.mock.events.changeNetworkFalse
      bridge.receive(event.eventType, event.data, 'env')
    } else {
      alert('try to change your network by switching it off, we expect network to be setted to false')
    }
  })
}
