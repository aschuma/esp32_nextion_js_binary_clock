load('api_gpio.js');
load('api_timer.js');
load('api_mqtt.js');
load('api_uart.js');
load('api_sys.js');
load('api_esp32.js');
load('localtimemodel.js');
load('strings.js');


let led = 4;

// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);
Timer.set(5000 /* 1 sec */, true /* repeat */, function () {
  print("Toggling LED");
  let value = GPIO.toggle(led);
  let res = MQTT.pub('my/topic', JSON.stringify({ a: 1, b: 2 }), 1);
  let x = LocalTimeModel.model();
  print(JSON.stringify(x));
}, null);


// Uart number used for this example
let uartNo = 1;
// Accumulated Rx data, will be echoed back to Tx
let rxAcc = "";
let value = false;

UART.setConfig(uartNo, {
  baudRate: 115200,
  esp32: {
    gpio: {
      rx: 16,
      tx: 17,
    },
  },
});

// Set dispatcher callback, it will be called whenver new Rx data or space in
// the Tx buffer becomes available
UART.setDispatcher(uartNo, function (uartNo) {
  let ra = UART.readAvail(uartNo);
  if (ra > 0) {
    // Received new data: print it immediately to the console, and also
    // accumulate in the "rxAcc" variable which will be echoed back to UART later
    let data = UART.read(uartNo);
    print('Received UART data:', data);
    rxAcc += data;
  }
}, null);

// Enable Rx
UART.setRxEnabled(uartNo, true);

UART.write(
  uartNo,
  'cls BLACK\xff\xff\xff'
);
UART.flush(uartNo);

// Send UART data every second
Timer.set(1000 /* milliseconds */, Timer.REPEAT, function () {

  let matrix = LocalTimeModel.model().matrix;
  for (let i = 0; i < matrix.length; i++) {
    let column = matrix[i];
    for (let j = 0; j < column.length; j++) {
      let cell = column[j];
      let posx = JSON.stringify(50 * i);
      let posy = JSON.stringify(9 + 60 * (3 - j));
      if (cell) {
        UART.write(
          uartNo,
          'fill ' + posx + ',' + posy + ',42,42,1499\xff\xff\xff'
        );
      } else {
        UART.write(
          uartNo,
          'fill ' + posx + ',' + posy + ',42,42,BLACK\xff\xff\xff'
        );
      }
    }
  }
  UART.flush(uartNo);
  rxAcc = '';
}, null);
