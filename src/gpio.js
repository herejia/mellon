const wpi = require('wiring-pi');
const ON = 1;
const OFF = 0;

wpi.setup('wpi');

var pin = 0;

wpi.pinMode(pin, wpi.OUTPUT);

function openRemoteGpio() {
  wpi.digitalWrite(pin, ON);
  console.log('GPIO #17 ON');
  setTimeout(function() {
    console.log('GPIO #17 OFF');
    wpi.digitalWrite(pin, OFF);
  }, 2000);
}

module.exports = {
  openRemoteGpio: openRemoteGpio
};
