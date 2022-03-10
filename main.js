const Gpio = require('onoff').Gpio; // Gpio class
const {readWaterTemp} = require('./water-temp')


// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(_ => controlFunction(), 60000);

// Stop blinking the LED after 5 seconds
setTimeout(_ => {
    clearInterval(iv); // Stop blinking
  //  led.unexport();    // Unexport GPIO and free resources
}, 300000);


function controlFunction(){
    console.log(readWaterTemp());
}
