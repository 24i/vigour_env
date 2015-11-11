'use strict'

var Plugin = require('vigour-wrapper/lib/bridge/plugin')
var name = require('../package.json').name
module.exports = exports = new Plugin({
  key: name,
  device: {
    name: '',
    version: ''
  },
  platform: {
    name: '',
    version: ''
  },
  app: {
    id: ''
  }
})
