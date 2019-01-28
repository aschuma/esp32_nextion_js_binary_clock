load('localtime.js')

let LocalTimeModel = {

  _digit2bin: function (digit, maxElem) {
    let bin = [];
    let i = 0;
    maxElem = maxElem || 4;
    while (i < maxElem) {
      bin.push(digit % 2);
      digit = digit / 2;
      i = i + 1;
    }
    return bin;
  },

  _matrix: function (tsStruct) {
    return [
      LocalTimeModel._digit2bin(tsStruct.seconds % 10),
      LocalTimeModel._digit2bin(tsStruct.seconds / 10, 3),
      LocalTimeModel._digit2bin(tsStruct.minutes % 10),
      LocalTimeModel._digit2bin(tsStruct.minutes / 10, 3),
      LocalTimeModel._digit2bin(tsStruct.hours % 10),
      LocalTimeModel._digit2bin(tsStruct.hours / 10, 2)
    ];
  },

  model: function () {
    return LocalTimeModel._matrix(LocalTime.now());
  }
};
