'use strict'

var Config = require('vigour-config')
var config = new Config().env
console.log('READ ENV CONFIG!!!', config)
var Plugin = require('vigour-wrapper/lib/plugin')
// TODO add UA infos as properties
var agent = typeof navigator !== 'undefined'
  ? require('vigour-ua')(navigator.userAgent)
  : {}

var isMock = false
var isWeb = false
var isNative = false
var isReady = false

if (navigator.userAgent === 'android-native' || navigator.userAgent === 'ios-native') {
  isNative = true
} else if (agent.browser === true && (agent.platform === 'ios' || agent.platform === 'android')) {
  isNative = true
} else if (agent.browser && typeof agent.browser === 'string') {
  isWeb = true
  isReady = true
} else {
  isMock = true
  isReady = true
}

var setObj = {
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
  network: 'none',
  platform: agent.platform,
  browser: agent.browser,
  device: agent.device,
  isNative: isNative,
  isWeb: isWeb,
  isMock: isMock,
  ready: isReady,
  on: {
    value: {
      env () {
        this._platform.emit('init')
      }
    }
  }
}

if (config) {
  let merge = require('./util/merge')
  merge(setObj, config.serialize())
}

module.exports = new Plugin(setObj)
