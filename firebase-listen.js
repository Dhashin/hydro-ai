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


module.exports = { listenToChanges}
