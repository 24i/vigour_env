'use strict'

var bridge = require('vigour-wrapper/lib/bridge')

bridge.label = 'mockBridge'
bridge.mock = {
  methods: {
    init (opts, cb) {
      // init the plugin and get the current orientation, we will use portrait as start
      setTimeout(function () {
        cb && cb(null, {
          bundleId: 'mock',
          network: 'mock',
          country: 'mock',
          language: 'mock',
          region: 'mock',
          timezone: '2015-12-15T12:00:30+0100',
          model: 'mock',
          os: 'mock',
          osVersion: 'mock',
          appVersion: 'mock'
        })
      })
    }
  },
  events: {
    changeNetworkFalse: {
      eventType: 'change',
      data: {
        network: 'none'
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
    return bridge.mock.methods[fnName](opts, cb)
  }
})

module.exports = bridge
