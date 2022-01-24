const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const serviceAccount = require('./key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();


const sensor = require('node-dht-sensor');

const sensorNumber = 22;
const pinNumber = 4;




const writeUsers = async()=>{

    let currentDate = new Date().toLocaleString('en-ZA', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour12: false,
        hour: "numeric",
        minute: "numeric"}).replaceAll('/','-');
    console.log(currentDate);
    const docRef = await db.collection('environment').doc(`${currentDate}`);

    let finaltemp
    let finalhumidity
    //
    //  await sensor.read(sensorNumber, pinNumber, (err, temperature, humidity) =>  {
    //     if (err) {
    //         console.log("AHHHHHHHH error", err);
    //         return;
    //     }
    //
    //     console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) +  '%');
    //     finaltemp = temperature.toFixed(1) + '°C';
    //     finalhumidity = humidity.toFixed(1)  +  '%';
    //     docRef.set({
    //         temp : `${finaltemp}`,
    //         humidity : `${finalhumidity}`
    //     });
    //
    // });

    sensor.read(sensorNumber, pinNumber).then( (err, temperature, humidity) => {
        if(err){
            console.log("Error reading value");
        }else{
            finaltemp = temperature.toFixed(1) + '°C';
            finalhumidity = humidity.toFixed(1)  +  '%';

            console.log('temp: ' + finaltemp + 'humidity: ' + finalhumidity);

        }
    })





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
        console.log(doc.id, '=>', doc.data());
    });
}


const execute = async ()=> {
    // Your async task will execute with await
    console.log("---Start write users---")
    await writeUsers().then(r => {
        console.log('Write to db success');

    })
    console.log("---End write users---")


}


execute();
