'use strict'

var log = require('npmlog')
var path = require('path')
var fs = require('vigour-fs-promised')
var nativePlatforms = ['ios', 'android']

module.exports = exports = {}

exports.start = function () {
  log.info('- adding env -')

  var tasks = []

  var htmlTasks = []
  var htmlLocations = this.locateAsset(this.html)
  if (htmlLocations.assets) {
    htmlTasks.push(path.join(this.wwwDst, this.html))
  }
  if (htmlLocations.externalAssets) {
    htmlTasks.push(path.join(this.externalAssetsDir, this.html))
  }
  if (htmlTasks.length === 0) {
    var error = new Error('Invalid configuration')
    error.info = "Can't find app index (" + this.html + ') to change title'
    error.todo = 'Make sure `appIndexPath` is set to a file that appears in either `assets` or `externalAssets`'
    throw error
  }

  tasks.push(htmlTasks.reduce((prev, curr, index, arr) => {
    return prev.then(() => {
      return editFile(curr, (contents) => {
        return contents.replace('{{title}}', this.productName ? this.productName : 'title')
      })
    })
  }, Promise.resolve()))

  var fileName = 'build.js'
  var jsTasks = []
  var jsLocations = this.locateAsset(fileName)
  if (jsLocations.assets) {
    jsTasks.push(path.join(this.wwwDst, fileName))
  }
  if (jsLocations.externalAssets) {
    jsTasks.push(path.join(this.externalAssetsDir, fileName))
  }

  tasks.push(jsTasks.reduce((prev, curr, index, arr) => {
    return prev.then(() => {
      return editFile(curr, (contents) => {
        var extra = 'window.env={target:\'' + this.platform + '\'};'
        if (nativePlatforms.indexOf(this.platform) !== -1) {
          extra += 'window.vigour={native:{webview:true}};'
        }
        return extra + contents
      })
    })
  }, Promise.resolve()))

  return Promise.all(tasks)
}

function editFile (pth, edit) {
  return fs.readFileAsync(pth, 'utf8')
    .then((contents) => {
      return edit(contents)
    })
    .then((newContents) => {
      return fs.writeFileAsync(pth, newContents, 'utf8')
    })
}
