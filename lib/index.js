'use strict'

var Config = require('vigour-config')
var config = new Config().env
var _ = require('lodash')

var Plugin = require('vigour-wrapper/lib/plugin')
// TODO add UA infos as properties
var agent = typeof navigator !== 'undefined'
  ? require('vigour-ua')(navigator.userAgent)
  : {}

var isMock = false
var isWeb = false
var isNative = typeof window !== void 0 && _.get(window, ['vigour', 'native', 'webview'])
var isReady = false

if (agent.browser === true && (agent.platform === 'ios' || agent.platform === 'android')) {
  isNative = true
} else if (agent.browser && typeof agent.browser === 'string') {
  isWeb = true
  isReady = true
} else {
  isMock = true
  isReady = true
}

var platform = isNative
  ? require('./platform/native')
  : isWeb
    ? require('./platform/web')
    : require('./platform/mock')

var setObj = {
  key: 'env-plugin',
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
  ready: isReady,
  on: {
    value: {
      env () {
        this._platform.emit('init')
      }
    }
  },
  inject: platform
}

if (config) {
  let merge = require('./util/merge')
  merge(setObj, config.serialize())
}

module.exports = new Plugin(setObj)
