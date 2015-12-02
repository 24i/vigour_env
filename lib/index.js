'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')
// TODO add UA infos as properties
var agent = require('vigour-ua')(navigator.userAgent)

module.exports = new Plugin({
  inject: require('./platform'),
  bundleId: false,
  country: false,
  language: false,
  region: false,
  timezone: false,
  model: false,
  os: false,
  osVersion: false,
  appVersion: false,
  network: false,
  platform: {
    val: agent.platform
  },
  browser: {
    val: agent.browser
  },
  device: {
    val: agent.device
  },
  on: {
    data: {
      env () {
        this.platform.emit('init')
      }
    }
  }
})

