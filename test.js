let Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const gpio21 = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output
const gpio20 = new Gpio(20, 'out');
const gpio16 = new Gpio(16, 'out');
const gpio26 = new Gpio(26, 'out');
const gpio19 = new Gpio(19, 'out');
const gpio6 = new Gpio(6, 'out');
const gpio13 = new Gpio(13, 'out');

console.log('Cureent state is ', LED.readSync())


 function runPin(){
     gpio21.writeSync(1); //set pin state to 1 (turn LED on)
     gpio20.writeSync(1);
     gpio16.writeSync(1);
     gpio26.writeSync(1);
     gpio19.writeSync(1);
     gpio6.writeSync(1);
     gpio13.writeSync(1);

    console.log('Current state is ', gpio21.readSync())
    console.log('Current state is ', gpio20.readSync())
    console.log('Current state is ', gpio16.readSync())
    console.log('Current state is ', gpio26.readSync())
    console.log('Current state is ', gpio19.readSync())
     console.log('Current state is ', gpio6.readSync())
     console.log('Current state is ', gpio13.readSync())

}


runPin();
gpio21.unexport(); //set pin state to 1 (turn LED on)
gpio20.unexport();
gpio16.unexport();
gpio26.unexport();
gpio19.unexport();
gpio6.unexport();
gpio13.unexport();


