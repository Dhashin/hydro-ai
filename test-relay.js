const {Gpio} = require("onoff");

const sleep=(milliseconds) =>{
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
const gpio26 = new Gpio(26, 'out');
gpio26.write(1).then(r => {});
sleep(500);

console.log('Current state 26 is ', gpio26.readSync())
sleep(500);
gpio26.write(0).then(r => {});
sleep(30100);
console.log('Current state 26 is ', gpio26.readSync())
sleep(3000);
gpio26.write(1).then(r => {});
sleep(500);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.unexport();
