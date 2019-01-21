load('localtime.js')

let LocalTimeModel = {

  _digit2bin: function (digit) {
    let bin = [];
    let i = 0;
    while (i < 4) {
      bin.push(digit % 2);
      digit = digit / 2;
      i = i + 1;
    }
    return bin;
  },

  _matrix: function (tsStruct) {
    let tsModel = {
      time: tsStruct,
      matrix: [
        LocalTimeModel._digit2bin(tsStruct.hours / 10),
        LocalTimeModel._digit2bin(tsStruct.hours % 10),
        LocalTimeModel._digit2bin(tsStruct.minutes / 10),
        LocalTimeModel._digit2bin(tsStruct.minutes % 10),
        LocalTimeModel._digit2bin(tsStruct.seconds / 10),
        LocalTimeModel._digit2bin(tsStruct.seconds % 10)
      ]
    };
    return tsModel;
  },

  midnightModel: function () {
    let struct = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    return LocalTimeModel._matrix(struct);
  },

  model: function () {
    return LocalTimeModel._matrix(LocalTime.now());
  }
};

