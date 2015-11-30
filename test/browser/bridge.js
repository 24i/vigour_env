'use strict'

var bridge = require('vigour-wrapper/lib/bridge')

var nativeMethods = {
  init (opt, cb) {
    var response = {
      target: 'web'
    }
    // async callback
    setTimeout(() => {
      cb && cb(null, response)
    })
  }
}

bridge.define({
  send (pluginId, fnName, opts, cb) {
    nativeMethods[fnName](opts, cb, bridge)
  }
})

exports.inject = require('../../lib/platform/native')
