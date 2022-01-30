const gpio = require('rpi-gpio');
gpio.setup(40, gpio.DIR_HIGH, write);

function write(err) {
    if (err) throw err;
    gpio.write(40, false, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}
