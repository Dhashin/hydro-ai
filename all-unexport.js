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


gpio21.unexport()

gpio20.unexport()
gpio16.unexport()
gpio26.unexport()
gpio19.unexport()
gpio6.unexport()
gpio13.unexport()
gpio14.unexport()
gpio2.unexport()
gpio3.unexport()
gpio17.unexport()
gpio27.unexport()
