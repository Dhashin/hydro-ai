const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


const serviceAccount = require('./key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();


const sensor = require('node-dht-sensor').promises;

const sensorNumber = 22;
const pinNumber = 4;


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

    try {
        const res = await sensor.read(22, 4);

        finaltemp = res.temperature.toFixed(1) + '°C';
        finalhumidity = res.humidity.toFixed(1)  +  '%';

        console.log(
            `temp: ${finaltemp}` +
            `humidity: ${finalhumidity}`
        );
            docRef.set({
                temp : `${finaltemp}`,
                humidity : `${finalhumidity}`
            }).then(result => {
                console.log(result)
            });
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


writeUsers().then(()=>{console.log('Execution complete')});

