'use strict'

if (window.tizen && (window.tizen.systeminfo.getCapabilities().platformName === 'Tizen')) {
  exports.os = 'Tizen'
  exports.appVersion = window.tizen.application.getAppInfo().version
  exports.network = window.tizen.systeminfo.getCapabilities().wifi === true ? 'wifi' : 'cable'
  exports.bundleId = window.tizen.application.getAppInfo().id
  exports.platform = 'Tizen'
}

// TODO web implementation
exports._platform = {
  on: {
    change: {
      // env event will be triggered when one of the properties changes its value
      // eg {network: '3g'}
      env (data, event) {
        this.parent.set({ready: true})
      }
    },
    pause: {
      env () {
        this.parent.paused.val = true
      }
    },
    resume: {
      env () {
        this.parent.paused.val = false
      }
    },
    button: {
      env (data) {
        this.parent.button.val = data
      }
    }
  }
}
