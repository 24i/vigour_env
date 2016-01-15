'use strict'

var log = require('npmlog')
var path = require('path')
var fs = require('vigour-fs-promised')

module.exports = exports = {}

exports.start = function () {
  var self = this
  log.info('- adding env -')
  log.info('this.wwwDst:', this.wwwDst)
  log.info('this.appIndexPath', this.appIndexPath)

  var htmlPath = path.join(this.wwwDst, this.appIndexPath)
  var _html
  return readHtml()
    .then(addEnv)
    .then(writeHtml)

  function readHtml () {
    return fs.readFileAsync(htmlPath, 'utf8')
      .then(function (html) {
        _html = html
      })
  }

  function addEnv () {
    return 'window.env={target:\'' + self.platform + '\'}'
  }

  function writeHtml (envCode) {
    var newHtml = _html.replace('<head>', "<head><script type='text/javascript'>" + envCode + '</script>', 'i')
      .replace('{{title}}', self.productName ? self.productName : 'title')
    return fs.writeFileAsync(htmlPath, newHtml, 'utf8')
  }
}
