### Plugin API

**Emits**

`init`, on init the plugin expects the list of properties back ad JSON data. For network, if not connected, we decided to send `none`

**Listens**

`pause` would be nice to receive this event before the app goes in background. pause needs to be sent before the app goes in background so it can be processed by JS before the app leaves the screen (onBeforebackground in iOS? is this possible in Android?)

`resume` emitted when app comes back from being in background

`change` on property changes, it expect data in JSON format eg: `{ network: 'none' }`. More than one property could be send in the same event, eg: `{ network: 'none', language: 'es' }`

`button`, emitted when volume up (*volup*), volume down (*voldown*) and back (*back*)
