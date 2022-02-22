const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

const gpio5 = new Gpio(5, 'in');
console.log('Current state 21 is ', gpio5.readSync())
gpio5.unexport()
