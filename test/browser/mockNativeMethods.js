'use strict'
var bridge = require('vigour-wrapper/lib/bridge')

var mock = {
  label: 'bridge',
  methods: {
    init (opts, cb) {
      // init the plugin and get the current orientation, we will use portrait as start
      setTimeout(function () {
        cb && cb(null, {
          bundleId: 'buzz',
          network: 'wifi',
          country: 'nl',
          language: 'en',
          region: 'GB',
          timezone: 'GMT+09:30',
          model: 'iPhone 6s',
          os: 'android',
          osVersion: 19,
          appVersion: 1
        })
      })
    }
  },
  events: {
    changeNetworkFalse: {
      eventType: 'change',
      data: {
        network: false
      }
    },
    volUpPressed: {
      eventType: 'button',
      data: 'volUp'
    },
    volDownPressed: {
      eventType: 'button',
      data: 'volDown'
    },
    backPressed: {
      eventType: 'button',
      data: 'back'
    },
    pause: {
      eventType: 'pause',
      data: true
    },
    resume: {
      eventType: 'resume',
      data: true
    }
  }
}

bridge.define({
  send: function (pluginId, fnName, opts, cb) {
    return mock.methods[fnName](opts, cb)
  }
})

module.exports = mock
