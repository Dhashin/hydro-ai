const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

const gpio5 = new Gpio(5, 'in');
const gpio22 = new Gpio(22, 'in');
const gpio12 = new Gpio(12, 'in');
const gpio7 = new Gpio(7, 'in');
const gpio8 = new Gpio(8, 'in');


function readLevel( pin){

    if(pin===5){
        return gpio5.readSync()
    }

    if(pin===7){
        return gpio7.readSync()
    }

    if(pin===8){
        return gpio8.readSync()
    }

    if(pin===12){
        return gpio12.readSync()
    }

    if(pin===22){
        return gpio22.readSync()
    }

}



function logLevel(pin){
    if(pin===5){
        console.log( '5 ', gpio5.readSync());
    }

    if(pin===7){
        console.log( '7 ', gpio7.readSync());
    }

    if(pin===8){
        console.log( '8 ', gpio8.readSync());
    }

    if(pin===12){
        console.log( '12 ', gpio12.readSync());
    }

    if(pin===22){
        console.log( '22 ', gpio22.readSync());
    }
}


logLevel(5);
logLevel(7);
logLevel(8);
logLevel(12);
logLevel(22);

gpio5.unexport()
gpio22.unexport()
gpio12.unexport()
gpio7.unexport()
gpio8.unexport()

function unExportWaterLevelPins(){

    gpio5.unexport()
    gpio22.unexport()
    gpio12.unexport()
    gpio7.unexport()
    gpio8.unexport()
}

module.exports = {
    readLevel, logLevel, unExportWaterLevelPins
}
