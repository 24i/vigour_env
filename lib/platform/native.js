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
          this.parent.set(data)
          this.parent.set({ready: true})
        })
      }
    },
    change: {
      // env event will be triggered when one of the properties changes its value
      // eg {network: '3g'}
      env (data, event) {
        alert('CHANGE! - DATA: ' + JSON.stringify(data))
        this.parent.set(data)
      }
    },
    pause: {
      env () {
        alert('PAUSED!')
        this.parent.paused.val = true
      }
    },
    resume: {
      env () {
        alert('RESUMED!')
        this.parent.paused.val = false
      }
    },
    button: {
      env (data) {
        alert('BUTTON! - DATA: ' + JSON.stringify(data))
        this.parent.button.val = data
      }
    }
  }
}
