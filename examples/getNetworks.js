var Homie2Config = require('../index.js');

var homie2 = new Homie2Config();

homie2.getHeartBeatAsync()
  .then(function(isAlive) {
    if (!isAlive) {
      console.log("Oh no, we don't have a heartbeat! Please check the server url " + this.baseUrl);
    }
    return homie2.getNetworksAsync();
  }).then(function(deviceInfo) {
    console.log('Wifi Networks', deviceInfo);
  }, function(reason) {
    console.log('failed!', reason);
  }).catch(function (error) {
      console.log('general error',error);
  });
