const {Gpio} = require("onoff");

// 4 channel relay
const pump = new Gpio(19, 'out');   // cooler 1

pump.writeSync(0);
