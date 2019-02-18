const five = require('johnny-five')

const board = new five.Board({repl: true})

board.on('ready', function() {
  const led = new five.Led(13)
  const servo = new five.Servo({
    pin: 8
  })
  const joy = new five.Joystick({
    pins: ["A0", "A1"]
  })
  joy.on('change', (data) => {
    servo.to((data.y + 1) * 90)
    if (data.x > 0.3) {
      led.on()
      // servo.sweep()
    } else {
      led.off()
      // servo.stop()
      // servo.home()
    }
  })
  this.repl.inject({
    on: function() {
      led.on()
    },
    off: function() {
      led.stop().off()
    },
    blink: function() {
      led.blink()
    },
    brightness: function(b) {
      led.brightness(b)
    },
    kaho: function() {
      led.fade({
        easing: 'outSine',
        duration: 1000,
        cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
        keyFrames: [0, 25, 150, 255, 150, 100, 0],
        onstop: function() {
        }
      })
    },
    sweep: function(interval, step) {
      if (!interval) interval = 5000
      if (!step) step = 10
      servo.sweep({
        range: [20, 160],
        interval: interval,
        step: step
      })
    },
    home: function() {
      servo.home()
    },
    stop: function() {
      servo.stop()
    }
  })
})