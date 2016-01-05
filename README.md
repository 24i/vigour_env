[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://badge.fury.io/js/vigour-env.svg)](https://badge.fury.io/js/vigour-env)
[![Build Status](https://travis-ci.org/vigour-io/env.svg?branch=develop)](https://travis-ci.org/vigour-io/env)

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


// listening of pause and resume events
env.paused.on(() => {
  if (env.paused.val) {
    console.log('we went in background!')
  } else {
    console.log('we resumed!')
  }
})

env.button.on((data) => {
  console.log('Button pressed', data)
})
```

See for more use cases [tests](test)

#### Plugin results

Values of the plugin properties on different devices/simulators

###### Android Simulator

- os: Android
- osVersion: 23
- appVersion: 1.0.0
- model: Android SDK built for x86
- bundleId: io.vigour.env
- network: mobile
- language: en
- region: US
- country: us
- timezone: Europe/Amsterdam
- platform: android
- browser: true
- device: tablet

###### iOS Simulator

- os: iPhone OS
- osVersion: 9.2
- appVersion: 1.0
- model: Simulator
- bundleId: io.vigour.env
- network: WiFi
- language: en
- region: US
- country: US
- timezone: 2016-01-06T00:18:39+0100
- platform: ios
- browser: true
- device: phone
