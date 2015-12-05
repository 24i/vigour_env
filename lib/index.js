'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')
// TODO add UA infos as properties
var agent = typeof navigator !== 'undefined'
  ? require('vigour-ua')(navigator.userAgent)
  : {}

module.exports = new Plugin({
  inject: require('./platform'),
  paused: false,
  button: false,
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
  platform: agent.platform,
  browser: agent.browser,
  device: agent.device,
  on: {
    value: {
      env () {
        this._platform.emit('init')
      }
    }
  }
})

