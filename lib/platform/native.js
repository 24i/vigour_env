'use strict'
var pkg = require('../../package.json')

exports._platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      // on init we receive back an object will all the properties
      // eg: {network: 'wifi', country: 'nl'}
      env (cb, env) {
        this.send('init', null, (e, data) => {
          data.ready = true
          this.parent.set(data)
        })
      }
    },
    change: {
      // env event will be triggered when one of the properties changes its value
      // eg {network: '3g'}
      env (data, event) {
        this.parent.set(data)
      }
    },
    pause: {
      env () {
        this.parent.paused.val = true
      }
    },
    resume: {
      env () {
        this.parent.paused.val = false
      }
    },
    button: {
      env (data) {
        this.parent.button.val = data
      }
    }
  }
}
