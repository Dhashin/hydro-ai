const {Gpio} = require("onoff");

let gpio26 = new Gpio(26, 'out');
let gpio6 = new Gpio(6, 'out');
gpio26.writeSync(1);
gpio6.writeSync(1);
gpio26.unexport();
gpio6.unexport();
