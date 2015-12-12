'use strict'
var agent = require('vigour-ua')(navigator.userAgent)

if (navigator.userAgent === 'android-native' || navigator.userAgent === 'ios-native') {
  module.exports = require('./native')
} else if (agent.browser === true && (agent.platform === 'ios' || agent.platform === 'android')) {
  module.exports = require('./native')
} else if (agent.browser && typeof agent.browser === 'string') {
  module.exports = require('./web')
} else {
  module.exports = require('./mock')
}
