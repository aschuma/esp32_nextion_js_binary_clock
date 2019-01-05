load('localtime.js')

function _digit2bin(digit) {
  let bin = [];
  let i = 0;
  while (i < 4) {
    bin.push(digit % 2);
    digit = digit / 2;
    i = i + 1;
  }
  return bin;
}

let LocalTimeModel = function () {

  return {
    model: function () {

      let tsStruct = LocalTime.now();
      let tsModel = {
        time: tsStruct,
        matrix: [
          _digit2bin(tsStruct.hours / 10),
          _digit2bin(tsStruct.hours % 10),
          _digit2bin(tsStruct.minutes / 10),
          _digit2bin(tsStruct.minutes % 10),
          _digit2bin(tsStruct.seconds / 10),
          _digit2bin(tsStruct.seconds % 10)
        ]
      };

      print('model:', JSON.stringify(tsModel));
      return tsModel;
    }
  }

}();
