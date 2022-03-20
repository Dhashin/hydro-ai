const sensor = require('ds18b20-raspi');

function readWaterTemp(){
    return sensor.readSimpleC();
}

console.log(sensor.readSimpleC());
module.exports = {readWaterTemp}
