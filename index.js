const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO

const http = require('http');
const url = require('url');


const serviceAccount = require('./key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

const sensor = require('node-dht-sensor').promises;

const sensorNumber = 22;
const pinNumber = 4;

let lowerHumidity = 80;
let higherHumidity = 90;

// Individual relays
const gpio21 = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output
const gpio20 = new Gpio(20, 'out');
const gpio16 = new Gpio(16, 'out');
const gpio26 = new Gpio(26, 'out'); // Humidifier
const gpio19 = new Gpio(19, 'out');
const gpio6 = new Gpio(6, 'out');// Cooler
const gpio13 = new Gpio(13, 'out');
const gpio14 = new Gpio(14, 'out');
// 4 channel relay
const gpio2 = new Gpio(2, 'out'); // Pump 1
const gpio3 = new Gpio(3, 'out');// pump 2
const gpio17 = new Gpio(17, 'out');// pump 3
const gpio27 = new Gpio(27, 'out');// pump 4


const tearDown = () =>{
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



const getGpioState = () =>{
    return('Current state 21 is ', gpio21.readSync())
    return('Current state 20 is ', gpio20.readSync())
    return('Current state 16 is ', gpio16.readSync())
    return('Current state 26 is ', gpio26.readSync())
    return('Current state 19 is ', gpio19.readSync())
    return('Current state 6 is ', gpio6.readSync())
    return('Current state 13 is ', gpio13.readSync())
}

//  On and off controls for 21
 const turnOn21 = () =>{
    gpio21.writeSync(1);
}

 const turnOff21 = () =>{
    gpio21.writeSync(0);
}

//  On and off controls for 14
const turnOn14 = () =>{
    gpio14.writeSync(1);
}

const turnOff14 = () =>{
    gpio14.writeSync(0);
}


//  On and off controls for 20
 const turnOn20 = () =>{
    gpio20.writeSync(1);
}

 const turnOff20 = () =>{
    gpio20.writeSync(0);
}



//  On and off controls for 16
 const turnOn16 = () =>{
    gpio16.writeSync(1);
}

 const turnOff16 = () =>{
    gpio16.writeSync(0);
}


//  On and off controls for 26
 const turnOn26 = () =>{
    gpio26.writeSync(1);
}

 const turnOff26 = () =>{
    gpio26.writeSync(0);
}



//  On and off controls for 19
 const turnOn19 = () =>{
    gpio19.writeSync(1);
}

 const turnOff19 = () =>{
    gpio19.writeSync(0);
}


//  On and off controls for 6
 const turnOn6 = () =>{
    gpio6.writeSync(1);
}

 const turnOff6 = () =>{
    gpio6.writeSync(0);
}


//  On and off controls for 13
 const turnOn13 = () =>{
    gpio13.writeSync(1);
}

 const turnOff13 = () =>{
    gpio13.writeSync(0);
}


//  On and off controls for 2
const turnOn2 = () =>{
    gpio2.writeSync(1);
}

const turnOff2 = () =>{
    gpio2.writeSync(0);
}

//  On and off controls for 3
const turnOn3 = () =>{
    gpio3.writeSync(1);
}

const turnOff3 = () =>{
    gpio3.writeSync(0);
}

//  On and off controls for 17
const turnOn17 = () =>{
    gpio17.writeSync(1);
}

const turnOff17 = () =>{
    gpio17.writeSync(0);
}

//  On and off controls for 27
const turnOn27 = () =>{
    gpio27.writeSync(1);
}

const turnOff27 = () =>{
    gpio27.writeSync(0);
}




async function exec() {
    try {
        const res = await sensor.read(22, 4);
        console.log(
            `temp: ${res.temperature.toFixed(1)}°C, ` +
            `humidity: ${res.humidity.toFixed(1)}%`
        );
    } catch (err) {
        console.error("Failed to read sensor data:", err);
    }
}


//exec();


async function writeUsers() {

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


   // console.log("Current Date: ",currentDate);
      const docRef = await db.collection('environment').doc(`${currentDate}`);
    const docRefCooler = await db.collection('cooler').doc('1');
    const docRefHeater = await db.collection('heater').doc('1');
    const docRefHumidifier = await db.collection('humidifier').doc('1');
    const docRefExtractor = await db.collection('extractor').doc('1');


    let finaltemp
    let finalhumidity


    try {
        const res = await sensor.read(22, 4);

        finaltemp = res.temperature.toFixed(1) ;
        finalhumidity = res.humidity.toFixed(1);

        // console.log(
        //     `temp: ${finaltemp}°C` +
        //     `humidity: ${finalhumidity}%`
        // );
           const result= await docRef.set({
                temp : `${finaltemp}°C`,
                humidity : `${finalhumidity}%`
            })
      //  console.log(result);
        if(finaltemp > 26){
          //  console.log('Turning on cooler')
            await docRefCooler.set({
                status : 'on'
            })
         //   console.log('Turning off heater')
            await docRefHeater.set({
                status : 'off'
            })
        }else if(finaltemp < 21 ){
        //    console.log('Turning on heater')
            await docRefHeater.set({
                status : 'on'
            })
        //    console.log('Turning off cooler')
            await docRefCooler.set({
                status : 'off'
            })
        }

        if(finalhumidity < lowerHumidity) {
         //   console.log('Turning on humidifier')
            turnOn26()
            await docRefHumidifier.set({
                status : 'on'
            })
        }else if(finalhumidity > higherHumidity){
       //     console.log('Turning off humidifier')
            turnOff26()
            await docRefHumidifier.set({
                status : 'off'
            })
        }


    } catch (err) {
        console.error("Failed to read sensor data:", err);
    }





}

const sleep=(milliseconds) =>{
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}




const readUsers = async()=>{
    const snapshot = await db.collection('environment').get();
    snapshot.forEach((doc) => {
   //     console.log(doc.id, '=>', doc.data());
    });
}

const switchRelayOn =(request, response)=>{

    if(request.body.pin==21){
        turnOn21()
    }
    if(request.body.pin==6){
        turnOn6()
    }
    if(request.body.pin==13){
        turnOn13()
    }
    if(request.body.pin==19){
        turnOn19()
    }
    if(request.body.pin==16){
        turnOn16()
    }
    if(request.body.pin==20){
        turnOn20()
    }
    if(request.body.pin==26){
        turnOn26()
    }

}

const switchRelayOff =(request, response)=>{

    if(request.body.pin==21){
        turnOff21()
    }
    if(request.body.pin==6){
        turnOff6()
    }
    if(request.body.pin==13){
        turnOff13()
    }
    if(request.body.pin==19){
        turnOff19()
    }
    if(request.body.pin==16){
        turnOff16()
    }
    if(request.body.pin==20){
        turnOff20()
    }
    if(request.body.pin==26){
        turnOff26()
    }

}

const routes = {
    '/on': switchRelayOn,
    '/off': switchRelayOff
};

async function execute(){
    while(1===1){
        await writeUsers();
        await sleep(60000);
    }

}

listenToChanges(db);

execute().then()


function listenToChanges(db){
    db.collection('cooler').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn6()
        }else{
            turnOff6()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });


    db.collection('pump1').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn2()
        }else{
            turnOff2()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('pump2').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn3()
        }else{
            turnOff3()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('pump3').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn17()
        }else{
            turnOff17()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('pump4').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn27()
        }else{
            turnOff27()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('extractor').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn20()
        }else{
            turnOff20()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('heater').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn21()
        }else{
            turnOff21()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('humidifier').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn26()
        }else{
            turnOff26()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('supplyPump').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn16()
        }else{
            turnOff16()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('drainPump').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn13()
        }else{
            turnOff13()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });


    db.collection('phUp').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn19()
        }else{
            turnOff19()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

    db.collection('phDown').doc('1').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: `, docSnapshot.data().status);
        if(docSnapshot.data().status==='on'){
            turnOn14()
        }else{
            turnOff14()
        }


        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });

}


process.on('SIGINT', function() {
    tearDown();
    process.exit();
});
