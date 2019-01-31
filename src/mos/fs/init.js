load('api_timer.js');
load('api_sys.js');
load('api_esp32.js');
load('localtimemodel.js');
load('display.js');

let displayWidth = 320;
let displayHeight = 240;
let cellWidth = 50;
let numberXCells = 6;
let numberYCells = 4;
let margin = 6;
let elementWidth = cellWidth - 2 * margin;

let uartNo = 1;

Display.init(uartNo, {
  baudRate: 115200,
  esp32: {
    gpio: {
      rx: 16,
      tx: 17
    },
  },
});

let prevModel = null;
Timer.set(1000 /* milliseconds */, Timer.REPEAT, function () {

  if (!prevModel) {
    Display.cls();
  }

  let model = LocalTimeModel.model();
  renderModel(model, prevModel);
  prevModel = model;

}, null);


function renderModel(matrix, prevMatrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {

      let cell = matrix[i][j];
      let prevCell = prevMatrix ? prevMatrix[i][j] : null;

      if (prevCell === null) {
        renderCell(i, j, true);
        renderCell(i, j, false);
      }

      if (cell !== prevCell) {
        renderCell(i, j, cell);
      }
    }
  }
}

function renderCell(xIndex, yIndex, mode) {
  let colorBlue = 1499;
  let colorGray = 10565;

  let point = cellPosition(xIndex, yIndex);
  let x = point.x - elementWidth / 2 + margin;
  let y = point.y - elementWidth / 2 + margin;
  if (mode) {
    Display.fill(x, y, elementWidth, elementWidth, colorBlue);
    // Display.cirs(point.x, point.y, elementWidth / 2, colorBlue);
  } else {
    Display.fill(x + 1, y + 1, elementWidth - 2, elementWidth - 2, colorGray);
    // Display.cirs(point.x, point.y, (elementWidth - 2) / 2, colorGray);
  }
}

function cellPosition(xIndex, yIndex) {
  let xOffset = (displayWidth - cellWidth * numberXCells) / 2;
  let yOffset = (displayHeight - cellWidth * numberYCells) / 2;

  return {
    x: displayWidth - (xOffset + xIndex * cellWidth + cellWidth / 2),
    y: displayHeight - (yOffset + yIndex * cellWidth + cellWidth / 2)
  }
}
