const sensor = require('ds18b20-raspi');

function readWaterTemp(){
    return sensor.readSimpleC();
}
module.exports = {readWaterTemp}
