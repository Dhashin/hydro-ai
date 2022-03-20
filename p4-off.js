const {Gpio} = require("onoff");

// 4 channel relay
const pump = new Gpio(27, 'out');   // Pump 1

pump.writeSync(0);
