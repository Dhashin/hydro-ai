const {Gpio} = require("onoff");


const gpio26 = new Gpio(26, 'out');
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.unexport();
