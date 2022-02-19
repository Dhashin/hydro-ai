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

const gpio21 = new Gpio(21, 'out'); //use GPIO pin 4, and specify that it is output
const gpio20 = new Gpio(20, 'out');
const gpio16 = new Gpio(16, 'out');
const gpio26 = new Gpio(26, 'out');
const gpio19 = new Gpio(19, 'out');
const gpio6 = new Gpio(6, 'out');
const gpio13 = new Gpio(13, 'out');


const tearDown = () =>{
    gpio21.unexport();
    gpio20.unexport();
    gpio16.unexport();
    gpio26.unexport();
    gpio19.unexport();
    gpio6.unexport();
    gpio13.unexport();
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




async function exec() {
    try {
        const res = await sensor.read(22, 4);
        // console.log(
        //     `temp: ${res.temperature.toFixed(1)}°C, ` +
        //     `humidity: ${res.humidity.toFixed(1)}%`
        // );
    } catch (err) {
        console.error("Failed to read sensor data:", err);
    }
}


//exec();


async function writeUsers() {

    let currentDate = (new Date().toLocaleString('en-ZA', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour12: false,
        hour: "numeric",
        minute: "numeric"}) + '')
        .replaceAll('/','-');
  //  console.log(currentDate);
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
        if(finaltemp > 24){
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

        if(finalhumidity < 60) {
         //   console.log('Turning on humidifier')
            await docRefHumidifier.set({
                status : 'on'
            })
        }else if(finalhumidity > 80){
       //     console.log('Turning off humidifier')
            await docRefHumidifier.set({
                status : 'off'
            })
        }

        if(finalhumidity < 70) {
      //      console.log('Turning off extractor')
            await docRefExtractor.set({
                status : 'off'
            })
        }else if(finalhumidity > 90){
       //     console.log('Turning on extractor')
            await docRefExtractor.set({
                status : 'on'
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
        sleep(60000);
    }

}

execute().then()


let server = http.createServer(function(request, response) {
    let urlParts = url.parse(request.url);
    let route = routes[urlParts.pathname];
    if (route) route(request, response);
    else utilities.sendResponse(response, 'Not Found', 404);
}).listen(3000, '127.0.0.1');


process.on('SIGINT', function() {
    tearDown();
    process.exit();
});
