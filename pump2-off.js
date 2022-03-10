const {Gpio} = require("onoff");
const gpio2 = new Gpio(2, 'out');
gpio2.writeSync(0);
