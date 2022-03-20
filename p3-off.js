const {Gpio} = require("onoff");

// 4 channel relay
const pump = new Gpio(17, 'out');   // Pump 1

pump.writeSync(0);
