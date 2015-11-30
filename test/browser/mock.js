'use strict'

exports.platform = {
  on: {
    init: {
      env () {
        setTimeout(() => {
          this.handleResponse()
          this.ready.val = true
        }, 10)
      }
    }
  },
  define: {
    handleResponse (res) {
      if (res) {
        // TODO
      } else {
        // TODO
      }
    }
  }
}
