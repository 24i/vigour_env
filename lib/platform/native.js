'use strict'
var pkg = require('../../package.json')

exports.platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      // on init we receive back an object will all the properties
      // eg: {network: 'wifi', country: 'nl'}
      env (cb, env) {
        this.send('init', null, (e, data) => {
          var plugin = this.parent
          plugin.set(data)
          plugin.ready.val = true
        })
      }
    },
    change: {
      // env event will be triggered when one of the properties changes its value
      // eg {network: '3g'}
      env (data, event) {
        this.parent.set(data)
      }
    }
  }
}