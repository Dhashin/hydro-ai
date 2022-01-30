const gpio = require('rpi-gpio');
gpio.setup(40, gpio.DIR_OUT);

    gpio.write(40, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
