const Gpio = require('onoff').Gpio; // Gpio class
const {readWaterTemp} = require('./water-temp')
const {turnOffCooler, turnOnCooler, turnoffP1, turnonP5, turnoffP4, turnoffP2, turnoffP3, turnoffP5, turnonP1, turnonP2, turnonP3, turnonP4} = require('./control-relays')
const {readLevel, logLevel, unExportWaterLevelPins} = require('./water-level')
let waterLevel1 = 5;
let waterLevel2 = 22;
let waterLevel3 = 12;
let waterLevel4 = 7;
let waterLevel5 = 8;


// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(_ => controlFunction(), 60000);

// Stop blinking the LED after 5 seconds
setTimeout(_ => {
    clearInterval(iv); // Stop blinking
  //  led.unexport();    // Unexport GPIO and free resources
}, 300000);


function controlFunction(){
  let waterTemp = readWaterTemp();
  if(waterTemp > 24){
      turnOnCooler()
  }else if(waterTemp < 18){
      turnOffCooler()
  }
}



function handleWaterLevelAndPumps(){

    if(readLevel(waterLevel1)===0){
        turnoffP1()
    }else{
        turnonP1()
    }
    if(readLevel(waterLevel2)===0){
        turnoffP1()
    }else{
        turnonP1()
    }

    if(readLevel(waterLevel3)===0){
        turnoffP1()
    }else{
        turnonP1()
    }

    if(readLevel(waterLevel4)===0){
        turnoffP1()
    }else{
        turnonP1()
    }

    if(readLevel(waterLevel5)===0){
        turnoffP1()
    }else{
        turnonP1()
    }

}



