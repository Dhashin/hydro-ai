const {Gpio} = require("onoff");

let gpio26 = new Gpio(26, 'out');
let gpio6 = new Gpio(6, 'out');
gpio26.write(0).then(r => {});
gpio6.write(0).then(r => {});
gpio26.unexport();
gpio6.unexport();
