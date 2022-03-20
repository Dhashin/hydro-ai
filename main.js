const Gpio = require('onoff').Gpio; // Gpio class
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const {readWaterTemp} = require('./water-temp')
const {turnOffCooler, turnOnCooler, turnoffP1, turnonP5, turnoffP4, turnoffP2, turnoffP3, turnoffP5, turnonP1, turnonP2, turnonP3, turnonP4,
    turnOnHumidifier,
    turnOffHumidifier
} = require('./control-relays')
const serviceAccount = require('./key.json');
const waterTempSensor = require("ds18b20-raspi");
const sensor = require('node-dht-sensor').promises;

const sensorNumber = 22;
const pinNumber = 15;

let lowerHumidity = 80;
let higherHumidity = 70;

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

let waterLevel1 = 8;
let waterLevel2 = 5;
let waterLevel3 = 12;
let waterLevel4 = 22;
let waterLevel5 = 7;

const gpio5 = new Gpio(5, 'in');//2
const gpio22 = new Gpio(22, 'in');//4
const gpio12 = new Gpio(12, 'in');//3
const gpio7 = new Gpio(7, 'in');//5
const gpio8 = new Gpio(8, 'in');// 1


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







// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(_ => controlFunction(), 60000);

// Stop blinking the LED after 5 seconds
// setTimeout(_ => {
//     clearInterval(iv); // Stop blinking
//   //  led.unexport();    // Unexport GPIO and free resources
// }, 300000);

function getCurrentDate(){

    let currentDate
    try{
        currentDate =  (new Date().toLocaleString('en-ZA', {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour12: false,
            hour: "numeric",
            minute: "numeric"}))
            .toString()
            .replace('/','-').replace('/','-').replace('/','-');
    }
    catch (err){
        console.log('Error getting date: ', err)
    }
    return currentDate
}


function controlFunction(){
  let waterTemp = readWaterTemp();
  if(waterTemp > 24){
      turnOnCooler()
  }else if(waterTemp < 18){
      turnOffCooler()
  }

  handleWaterLevelAndPumps();
    handleEnvironment().then();

}



function handleWaterLevelAndPumps(){

    if(readLevel(waterLevel1)===0){
        turnoffP5()
        turnonP1()
    }else{
        turnoffP1()
    }

    if(readLevel(waterLevel2)===0){
        turnoffP5()
        turnonP2()
    }else{
        turnoffP2()
    }

    if(readLevel(waterLevel3)===0){
        turnoffP5()
        turnonP3()
    }else{
        turnoffP3()
    }

    if(readLevel(waterLevel4)===0){
        turnoffP5()
        turnonP4()
    }else{
        turnoffP4()
    }


    if(readLevel(waterLevel5)===0){
        turnonP5()
    }

    if(readLevel(waterLevel4)===1 && readLevel(waterLevel3)===1 && readLevel(waterLevel2)===1 && readLevel(waterLevel1)===1){
        turnonP5()
    }

}
async function handleEnvironment(){
    const docRef =  await db.collection('environment').doc(`${getCurrentDate()}`);
    const docRefHumidifier =  await db.collection('humidifier').doc('1');

    try {
        const res = await sensor.read(22, 4);


        let    finalTemp = res.temperature.toFixed(1) ;
        let  finalHumidity = res.humidity.toFixed(1);

        // console.log(
        //     `temp: ${finaltemp}°C` +
        //     `humidity: ${finalhumidity}%`
        // );
        const result= await docRef.set({
            temp : `${finalTemp}°C`,
            humidity : `${finalHumidity}%`,
            waterTemp: `${ readWaterTemp()}°C`
        })
        //  console.log(result);
        if(finalHumidity > higherHumidity){
            //  console.log('Turning on cooler')
            await docRefHumidifier.set({
                status : 'off'
            })
            turnOffHumidifier()

        }else {
            await docRefHumidifier.set({
                status : 'on'
            })
            turnOnHumidifier()
        }


    } catch (err) {
        console.error("Failed to read sensor data:", err);
    }



}


