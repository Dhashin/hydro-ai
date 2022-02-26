const {Gpio} = require("onoff");


const gpio26 = new Gpio(26, 'out');
gpio26.writeSync(1);
gpio26.writeSync(0);
gpio26.writeSync(1);
gpio26.writeSync(0);
gpio26.writeSync(1);
gpio26.writeSync(0);
gpio26.writeSync(1);
gpio26.writeSync(0);
gpio26.unexport();
