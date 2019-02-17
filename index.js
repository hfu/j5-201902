const five = require('johnny-five')
const board = new five.Board()

board.on('ready', () => {
  const led = new five.Led.RGB({
    pins: { red: 6, green: 5, blue: 3 }
  })
  board.repl.inject({led: led})
  led.on()
  led.color("#FF0000")
  led.blink(1000)
})
