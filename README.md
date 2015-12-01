# env
Provides info about the device, platform and build

## Install
Add `"env": "git+ssh://git@github.com:vigour-io/env.git#master"` to the dependencies in your app's pakage.json, then run `npm update env`
Coming soon: `npm i vigour-env`

## Updates via upstream remote
- `git remote add skeleton git@github.com:vigour-io/plugin.git`
- `git pull skeleton develop`

## Usage
See [tests](test)

## Building native apps
See [wrapper](http://github.com/vigour-io/vigour-native)

### Android
The build process will use the latest version of the plugins library, the latest version is [ ![Download](https://api.bintray.com/packages/vigour/maven/plugin-env/images/download.svg) ](https://bintray.com/vigour/maven/plugin-env/_latestVersion)

##3 events
resume
pause
button
