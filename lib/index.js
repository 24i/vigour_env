'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')
// TODO add UA infos as properties
var agent = typeof navigator !== 'undefined'
  ? require('vigour-ua')(navigator.userAgent)
  : {}

var isMock = false
var isWeb = false
var isNative = false

if (navigator.userAgent === 'android-native' || navigator.userAgent === 'ios-native') {
  isNative = true
} if (agent.browser === true && (agent.platform === 'ios' || agent.platform === 'android')) {
  isNative = true
} else if (agent.browser && typeof agent.browser === 'string') {
  isWeb = true
} else {
  isMock = true
}

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
  isNative: isNative,
  isWeb: isWeb,
  isMock: isMock,
  ready: true,
  on: {
    value: {
      env () {
        this._platform.emit('init')
      }
    }
  }
})

