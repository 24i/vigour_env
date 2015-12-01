'use strict'
var Plugin = require('vigour-wrapper/lib/plugin')
// TODO add UA infos as properties
// var ua = require('vigour-ua')

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
  on: {
    data: {
      env: {
        condition (data, done, event) {
          this.platform.emit('init', done)
        }
      }
    }
  }
})
