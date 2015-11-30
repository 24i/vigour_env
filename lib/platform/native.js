'use strict'

var pkg = require('../../package.json')

exports.platform = {
  inject: require('vigour-wrapper/lib/bridge/inject')(pkg.name),
  on: {
    init: {
      env () {
        this.send('init', null, (e, res) => {
          this.handleResponse(res)
          this.ready.val = true
        })
      }
    }
  },
  define: {
    handleResponse (res) {
      // var plugin = this.parent
      if (res) {
        // TODO
      } else {
        // TODO
      }
    }
  }
}
