'use strict'

var log = require('npmlog')
var path = require('path')
var fs = require('vigour-fs-promised')

module.exports = exports = {}

exports.start = function () {
  log.info('- adding env -')
  log.info('this.wwwDst:', this.wwwDst)
  log.info('this.appIndexPath', this.appIndexPath)

  var htmlPath = path.join(this.wwwDst, this.appIndexPath)
  var jsPath = path.join(this.wwwDst, 'build.js')

  return Promise.all([
    editFile(htmlPath, (contents) => {
      return contents.replace('{{title}}', this.productName ? this.productName : 'title')
    }),
    editFile(jsPath, (contents) => {
      return 'window.env={target:\'' + this.platform + '\'};window.vigour={native:{webview:true}};' + contents
    })
  ])
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
