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
    const docRefCooler = await db.collection('cooler').doc('1');
    const docRefHeater = await db.collection('heater').doc('1');
    const docRefHumidifier = await db.collection('humidifier').doc('1');
    const docRefExtractor = await db.collection('extractor').doc('1');

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

        finaltemp = res.temperature.toFixed(1) ;
        finalhumidity = res.humidity.toFixed(1);

        console.log(
            `temp: ${finaltemp}°C` +
            `humidity: ${finalhumidity}%`
        );
           const result= await docRef.set({
                temp : `${finaltemp}°C`,
                humidity : `${finalhumidity}%`
            })
        console.log(result);
        if(finaltemp > 24){
            console.log('Turning on cooler')
            await docRefCooler.set({
                status : 'on'
            })
            console.log('Turning off heater')
            await docRefHeater.set({
                status : 'off'
            })
        }else if(finaltemp < 21 ){
            console.log('Turning on heater')
            await docRefHeater.set({
                status : 'on'
            })
            console.log('Turning off cooler')
            await docRefCooler.set({
                status : 'off'
            })
        }

        if(finalhumidity < 60) {
            console.log('Turning on humidifier')
            await docRefHumidifier.set({
                status : 'on'
            })
        }else if(finalhumidity > 80){
            console.log('Turning off humidifier')
            await docRefHumidifier.set({
                status : 'off'
            })
        }

        if(finalhumidity < 70) {
            console.log('Turning off extractor')
            await docRefExtractor.set({
                status : 'off'
            })
        }else if(finalhumidity > 90){
            console.log('Turning on extractor')
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
        console.log(doc.id, '=>', doc.data());
    });
}



async function execute(){
    while(1===1){
        await writeUsers();
        sleep(60000);
    }

}

execute().then()

