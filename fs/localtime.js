load('api_timer.js');
load('strings.js');

let LocalTime = function () {

  return {
    now: function () {

      let now = Timer.now();
      let timestamp = Timer.fmt("%H:%M:%S", now);
      let timestampParts = Strings.split(timestamp, ":");

      let struct = {
        hours: JSON.parse(timestampParts[0]),
        minutes: JSON.parse(timestampParts[1]),
        seconds: JSON.parse(timestampParts[2])
      };

      return struct;
    }
  };
}(); 
