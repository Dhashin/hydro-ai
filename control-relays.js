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




function unexportAll(){
    gpio21.unexport();
    gpio20.unexport();
    gpio16.unexport();
    gpio26.unexport();

    gpio19.unexport();
    gpio6.unexport();
    gpio13.unexport();
    gpio14.unexport();

    gpio2.unexport();
    gpio3.unexport();
    gpio17.unexport();
    gpio27.unexport();
}

function turnOnCooler(){
    gpio26.writeSync(1)
}


function turnOffCooler(){
    gpio26.writeSync(0)
}

function turnoffP1(){
    gpio2.writeSync(0);
}

function turnoffP2(){
    gpio3.writeSync(0);
}

function turnoffP3(){
    gpio17.writeSync(0);
}

function turnoffP4(){
    gpio27.writeSync(0);
}

function turnoffP5(){
    gpio14.writeSync(0);
}

function turnonP1(){
    gpio2.writeSync(1);
}

function turnonP2(){
    gpio3.writeSync(1);
}

function turnonP3(){
    gpio17.writeSync(1);
}

function turnonP4(){
    gpio27.writeSync(1);
}

function turnonP5(){
    gpio14.writeSync(1);
}

module.exports = {
    turnonP5, turnoffP1, turnonP4, turnonP3 , turnonP2 , turnonP1, turnoffP2, turnoffP3, turnoffP4, turnoffP5, turnOffCooler, turnOnCooler
}
