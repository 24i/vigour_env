[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/vigour-status-bar.svg)](https://badge.fury.io/js/vigour-env)
[![Build Status](https://travis-ci.org/vigour-io/status-bar.svg?branch=develop)](https://travis-ci.org/vigour-io/env)

# env
Provides info about the device, platform and build

## Install
Add `"env": "git+ssh://git@github.com:vigour-io/env.git#master"` to the dependencies in your app's pakage.json, then run `npm update env`
Coming soon: `npm i vigour-env`

## Updates via upstream remote
- `git remote add skeleton git@github.com:vigour-io/plugin.git`
- `git pull skeleton develop`

## Usage
The plugin will be used to access device properties and will listen for changes of those. It will also used to catch device events like `pause`, `resume` and `button`.

Properties expected (-- those can change based on their availability on different platforms --): bundleId, country, language, region, timezone, model, os, osVersion, appVersion and network.

If a property change on the device this can be communicated using the `change` event passing always the same object format as in `init` but with just the properties changed

The plugin expects to receive feedbacks about button press on: volume up (volup), volume down (voldown) and back (back)

```js
// plugin on init will expect to receive back the values for its own properties
// passed as an object, eg: {network: 'wifi', model: 'iPhone 6s'}
var env = require('vigour-env')

// listening for the plugin to be ready
env.ready.is(true, () {
  // we have properties filled in here!
})

// listening for properties changes
env.network.on(() => {
 // network is changed! 
})


// listening ofr pause and resume events
env.on('pause', () => {
  console.log('application went in background')
})
env.on('resume', () => {
  console.log('application is back in foreground')
})

// listening for button press events
env.on('button', (data, event) => {
  var type = data.button
  swicth (button) {
    case 'volup':
      console.log('volume is going up!')
      break
    case 'voldown':
      console.log('volume is going down')
      break
    case 'back':
      console.log('going back')
      break
  }
})
```

See for more use cases [tests](test)
