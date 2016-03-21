'use strict'

var get = require('lodash.get')

var pkg = require('vigour-package')
var config = pkg.env

var Plugin = require('vigour-wrapper-bridge/lib/plugin')
var agent = require('vigour-ua/navigator')

var isMock = false
var isWeb = false

var isNative = agent.webview

/* backwards compatibility: check for window.vigour.native.webview */
if (
  !isNative &&
  typeof window !== 'undefined' && get(window, ['vigour', 'native', 'webview'])
  ) {
  isNative = agent.webview = true
}

var isReady = false

if (!isNative) {
  isReady = true
  if (agent.browser && typeof agent.browser === 'string') {
    isWeb = true
  } else {
    isMock = true
  }
}

// console.log('isNative!!!', isNative)
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
    data: {
      env () {
        this._platform.emit('init')
      }
    }
  },
  inject: platform
}

if (config) {
  let merge = require('./util/merge')
  merge(setObj, config)
}

var env = new Plugin(setObj)
env.val = true

module.exports = env
