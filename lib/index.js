'use strict'

var Plugin = require('vigour-wrapper/lib/plugin')

module.exports = new Plugin({
  inject: require('./platform'),
  target: window.env && window.env.target || 'web',
  on: {
    value: {
      env (data, event) {
        if (this.val === true) {
          this.platform.emit('init', data, event)
        }
      }
    }
  }
})
