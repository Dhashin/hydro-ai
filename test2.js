const gpio = require('rpi-gpio');



    async function setup(){
        await gpio.setup(40, gpio.DIR_OUT);
    }

    setup().then(()=>{
            gpio.write(40, true, function(err) {
                if (err) throw err;
                console.log('Written to pin');
            });

        }

    )
