'use strict'

if (window.tizen && (window.tizen.systeminfo.getCapabilities().platformName === 'Tizen')) {
  exports.os = 'tizen'
  exports.appVersion = window.tizen.application.getAppInfo().version
  exports.bundleId = window.tizen.application.getAppInfo().id
  exports.platform = 'tizen'
}

if (window.webOS) {
  exports.os = 'webostv'
  exports.model = window.webOS.device.modelName
  exports.device = 'tv'
  exports.platform = window.webOS.platform.tv === true ? 'tv' : void 0
  exports.bundleId = window.webOS.fetchAppId()
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
