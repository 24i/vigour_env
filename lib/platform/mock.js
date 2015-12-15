'use strict'

exports._platform = {
  on: {
    init: {
      env () {
        console.log('mock init!')

        setTimeout(() => {
          this.parent.set({
            bundleId: 'mock',
            network: 'mock',
            country: 'mock',
            language: 'mock',
            region: 'mock',
            timezone: getDate(),
            model: 'mock',
            os: 'mock',
            osVersion: 'mock',
            appVersion: 'mock'
          })
        })
      }
    },
    change (data) {
      this.parent.set(data)
    },
    pause () {
      this.parent.paused.val = true
    },
    resume () {
      this.parent.paused.val = false
    },
    button (type) {
      this.parent.button.val = type
    }
  }
}

function getDate () {
  var date = new Date()
  return getDateAndTime(date) + getTimeZone(date)
}

function getTimeZone (date) {
  var sign
  var offset = (date.getTimezoneOffset() * -1) / 60
  if (offset > 0) sign = '+'
  else sign = '-'
  if (offset > -10 && offset < 10) return sign + '0' + offset + '00'
  else return sign + offset + '00'
}

function getDateAndTime (date) {
  var iso = date.toISOString()
  return iso.substring(0, iso.indexOf('.'))
}
