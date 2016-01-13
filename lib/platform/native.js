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
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data)
          } catch (e) {
            this.parent.emit('error', 'Cannot parse bridge data')
          }
        }
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
      env (data, event) {
        var current = this.parent.button.val
        if (current === data) {
          this.parent.button.emit('data', event)
        } else {
          this.parent.button.set(data, event)
        }
      }
    }
  }
}
