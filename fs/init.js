load('api_gpio.js');
load('api_timer.js');
load('api_mqtt.js');
load('api_uart.js');
load('api_sys.js');
load('api_esp32.js');
load('localtimemodel.js');
load('strings.js');
load('display.js');

let led = 4;
GPIO.set_mode(led, GPIO.MODE_OUTPUT);

let uartNo = 1;
Display.init(uartNo, {
  baudRate: 115200,
  esp32: {
    gpio: {
      rx: 16,
      tx: 17,
    },
  },
});


Display.cls();

let prevMatrix = LocalTimeModel.midnightModel().matrix;

Timer.set(1000 /* milliseconds */, Timer.REPEAT, function () {

  GPIO.toggle(led);
  let matrix = LocalTimeModel.model().matrix;
  for (let i = 0; i < matrix.length; i++) {
    let column = matrix[i];
    for (let j = 0; j < column.length; j++) {
      let cell = column[j];
      if (prevMatrix[i][j] !== cell) {
        let posx = 50 * i;
        let posy = 20 + 50 * (3 - j);
        if (cell) {
          // Display.cirs(posx, posy, 21, 1499);
          Display.fill(posx, posy, 42, 42, 1499);
        } else {
          // Display.cir(posx, posy, 21, 'BLACK');
          Display.fill(posx, posy, 42, 42, 'BLACK');
          // Display.draw(posx, posy, 42, 42, 1499);
        }
      }
    }
  }
  prevMatrix = matrix;
}, null);
