load('api_timer.js');
load('api_sys.js');
load('api_esp32.js');
load('localtimemodel.js');
load('display.js');

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

function paint(matrix, prevMatrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let cell = matrix[i][j];
      let prevCell = prevMatrix ? prevMatrix[i][j] : null;
      if (cell !== prevCell) {
        let posx = 50 * i;
        let posy = 20 + 50 * (3 - j);
        if (cell) {
          Display.fill(posx, posy, 42, 42, 1499);
        }
        else {
          Display.fill(posx, posy, 42, 42, 10565);
        }
      }
    }
  }
}

let prevMatrix = null;
Timer.set(1000 /* milliseconds */, Timer.REPEAT, function () {
  let matrix = LocalTimeModel.model().matrix;
  paint(matrix,prevMatrix);
  prevMatrix = matrix;
}, null);
