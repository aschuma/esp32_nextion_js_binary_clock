load('api_timer.js');

/**
  * Modified copy of tkopacki/mongoose-string-utils/api_string.js
  */
let _splitString = function (string, delimeter) {
  delimeter = (delimeter === undefined ? ' ' : delimeter);
  string += delimeter;
  let counter = 0;
  let buffer = "";
  let result = [];
  for (let idx = 0; idx < string.length; idx++) {
    if (string[idx] === delimeter) {
      if (buffer !== '') {
        result[counter++] = buffer;
      }
      buffer = "";
    } else {
      buffer += string[idx];
    }
  }
  return result;
};

let LocalTime = function () {

  return {
    now: function () {

      let now = Timer.now();
      let timestamp = Timer.fmt("%H:%M:%S", now);
      let timestampParts = _splitString(timestamp, ":");

      let struct = {
        hours: JSON.parse(timestampParts[0]),
        minutes: JSON.parse(timestampParts[1]),
        seconds: JSON.parse(timestampParts[2])
      };

      print('now:', JSON.stringify(struct));
      return struct;
    }
  };
}(); 
