const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(14, 'out'); //use GPIO pin 4, and specify that it is output
// const led = new Gpio(20, 'out');
// const led = new Gpio(16, 'out');
// const led = new Gpio(26, 'out'); // Humidifier
// const led = new Gpio(19, 'out');
// const led = new Gpio(6, 'out');// Cooler
// const led = new Gpio(13, 'out');
// const led = new Gpio(14, 'out');
// // 4 channel relay
// const led = new Gpio(2, 'out'); // Pump 1
// const led = new Gpio(3, 'out');// pump 2
// const led = new Gpio(17, 'out');// pump 3
// const led = new Gpio(27, 'out');// pump 4     // Export GPIO17 as an output

// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(_ => led.writeSync(0), 200);

// Stop blinking the LED after 5 seconds
setTimeout(_ => {
    clearInterval(iv); // Stop blinking
    led.unexport();    // Unexport GPIO and free resources
}, 5000);
