'use strict'
require('gaston-tester')

describe('Env plugin manual tests', function () {
  var envPlugin = require('../../lib')

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
    this.timeout(25000)
    var previous = envPlugin.network.val
    envPlugin.network.on(() => {
      expect(envPlugin.network.val).to.not.euqual(previous)
      expect(envPlugin.network.val).to.be.false
      done()
    })
    alert('try to change your network by switching it off, we expect network to be setted to false')
  })

  // we should be able to listen for pause and resume events
  it('should listen for pause and resume events', function (done) {
    this.timeout(25000)
    var paused = false
    var resumed = false // eslint-disable-line

    envPlugin.once('pause', () => {
      paused = true
    })
    envPlugin.once('resume', () => {
      resumed = true
      expect(paused).to.be.true
      done()
    })

    alert('try to put the application in background and then to the foreground again')
  })

  // we should be able to listen for button events, we can receive them like
  // eg: {button: 'volup'}
  it('should be able to listen for volup button press', function (done) {
    envPlugin.on('button', (data) => {
      expect(data.button).to.equal('volup')
      done()
    })
    alert('close this and press the volume up button')
  })
  it('should be able to listen for voldown button press', function (done) {
    envPlugin.on('button', (data) => {
      expect(data.button).to.equal('voldown')
      done()
    })
    alert('close this and press the volume down button')
  })
  it('should be able to listen for back button press', function (done) {
    envPlugin.on('button', (data) => {
      expect(data.button).to.equal('back')
      done()
    })
    alert('close this and press the back button')
  })
})
