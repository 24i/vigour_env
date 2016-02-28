'use strict'

var log = require('npmlog')
var path = require('path')
var nativePlatforms = ['ios', 'android']

module.exports = exports = {}

exports.start = function () {
  // if (this.opts.doExternalAssets) {
  //   log.info('- building env -')
  //   var tasks = []
  //
  //   var fileName = 'build.js'
  //   var jsTasks = []
  //   var jsLocations = this.locateAsset(fileName)
  //   if (jsLocations.assets) {
  //     jsTasks.push(path.join(this.wwwDst, fileName))
  //   }
  //   if (jsLocations.externalAssets) {
  //     jsTasks.push(path.join(this.externalAssetsDir, fileName))
  //   }
  //
  //   tasks.push(jsTasks.reduce((prev, curr, index, arr) => {
  //     return prev.then(() => {
  //       return this.editFile(curr, (contents) => {
  //         var extra = 'window.env={target:\'' + this.platform + '\'};'
  //         if (nativePlatforms.indexOf(this.platform) !== -1) {
  //           extra += 'window.vigour={native:{webview:true}};'
  //         }
  //         return extra + contents
  //       })
  //     })
  //   }, Promise.resolve()))
  //
  //   return Promise.all(tasks)
  // } else {
    log.info('- skipping building env -')
  // }
}
