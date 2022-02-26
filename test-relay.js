const {Gpio} = require("onoff");

const sleep=(milliseconds) =>{
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
const gpio26 = new Gpio(26, 'out');
gpio26.writeSync(1);
sleep(500);

console.log('Current state 26 is ', gpio26.readSync())
sleep(500);
gpio26.writeSync(0);
sleep(500);
console.log('Current state 26 is ', gpio26.readSync())
sleep(500);
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(1);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.writeSync(0);
console.log('Current state 26 is ', gpio26.readSync())
gpio26.unexport();
