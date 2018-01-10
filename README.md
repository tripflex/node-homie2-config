# Homie2Config

Homie2Config is a node.js module to configure esp8266 boards loaded with [Homie firmware](https://github.com/marvinroger/homie-esp8266).

This is for Homie version 2.0+, original codebase from [HomieConfig](https://github.com/hongkongkiwi/node-homie-config)

## QuickStart

You can grab homie2-config from npm.

`npm install --save homie2-config`

Make sure to set an ip address or hostname for the board. By default, homie.local is used in case you don't pass anything.

```javascript
var Homie2Config = require('homie2-config');

var homie2 = new Homie2Config();
```

If you want to set the url you can do it this way:

`var homie2 = new Homie2Config({url: 'homie.local'});`

Traditional Callbacks

```javascript
// You can choose to use traditional callbacks
homie2.getHeartBeat(function(isAlive) {
  if (!isAlive) {
    return console.log("Oh no, we don't have a heartbeat!");
  }
  console.log("We have a heartbeat!");
});
```

Promises are also supported by attaching (async) to method names

```javascript
homie2.getHeartBeatAsync()
  .then(function(isAlive) {
    if (!isAlive) {
      console.log("Oh no, we don't have a heartbeat! Please check the server url " + this.baseUrl);
    }
    console.log("We have a heartbeat!");
  }).catch(function (error) {
    console.log('error',error);
  });
```

You can chain up the methods easily using promises. I recommend you always use getHeartBeat before other methods.

```javascript
homie2.getHeartBeatAsync()
  .then(function(isAlive) {
    if (!isAlive) {
      console.log("Oh no, we don't have a heartbeat! Please check the server url " + this.baseUrl);
    }
    return homie2.getDeviceInfoAsync();
  }).then(function(deviceInfo) {
    console.log('Device Info', deviceInfo);
  }).catch(function (error) {
    console.log('error',error);
  });
```

Please find more examples in the [examples directory](https://github.com/tripflex/node-homie2-config/tree/master/examples).

## Meteor Package
There is also a Meteor Package available that uses this npm module, and includes numerous other Homie helper methods:

[https://github.com/tripflex/meteor-homie](https://github.com/tripflex/meteor-homie)

## Configuration Wizard

There is a simple interactive configuration wizard available incase you just don't want to both with using it programatically.

In the examples directory run node ./configWizard.js

## Supported Methods

The library supports all [current Configuration API functions](http://marvinroger.github.io/homie-esp8266/docs/2.0.0-beta.3/configuration/http-json-api/).

These require the board to be accessible.

* getHeartBeat(callback)
* getDeviceInfo(callback)
* getNetworks(callback)
* saveConfig(config, callback)
* connectToWifi(ssid, password, callback)
* getWifiStatus(callback)
* setTransparentWifiProxy(enable, callback)
* generateConfig(device_name, device_id, wifi_ssid, wifi_password, mqtt_host, mqtt_options, ota, callback)

## Contributing

Feel free to submit any pull requests or add functionality, and check out the Meteor Package that includes this module, as well as numerous other helper methods:
[https://github.com/tripflex/meteor-homie](https://github.com/tripflex/meteor-homie)