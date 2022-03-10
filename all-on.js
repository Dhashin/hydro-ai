const {Gpio} = require("onoff");
const gpio21 = new Gpio(21, 'out'); // Nutrient 1
const gpio20 = new Gpio(20, 'out'); // Nutrient 2
const gpio16 = new Gpio(16, 'out'); // Nutrient 3
const gpio26 = new Gpio(26, 'out'); // Cooler

const gpio19 = new Gpio(19, 'out'); // ph down
const gpio6 = new Gpio(6, 'out');   // Humidifier
const gpio13 = new Gpio(13, 'out'); // ph up
const gpio14 = new Gpio(14, 'out'); // Pump 5
// 4 channel relay
const gpio2 = new Gpio(2, 'out');   // Pump 1
const gpio3 = new Gpio(3, 'out');   // pump 2
const gpio17 = new Gpio(17, 'out'); // pump 3
const gpio27 = new Gpio(27, 'out'); // pump 4
gpio2.writeSync(1);
gpio3.writeSync(1);
gpio17.writeSync(1);
gpio27.writeSync(1);

gpio14.writeSync(1);
gpio13.writeSync(1);
gpio6.writeSync(1);
gpio19.writeSync(1);

gpio26.writeSync(1);
gpio16.writeSync(1);
gpio20.writeSync(1);
gpio21.writeSync(1);



