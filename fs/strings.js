/**
  * Modified copy of tkopacki/mongoose-string-utils/api_string.js
  */

let Strings = {
    tostr : function(data) {
        return typeof data === 'string' ? data : JSON.stringify(data);
    },
    ltrim: function(string) {
        let idx = 0;
        while(string[idx] === ' ') {
            idx++;
        }
        return string.slice(idx, string.length);
    },
    rtrim: function(string) {
        let idx = string.length - 1;
        while(string[idx] === ' ') {
            idx--;
        }
        return string.slice(0, idx + 1);
    },
    trim: function(string) {
        return Strings.rtrim(Strings.ltrim(string));
    },
    split: function(string, delimeter, trim) {
        delimeter = (delimeter === undefined ? ' ' : delimeter);
        trim = (trim === undefined ? true : trim);
        string += delimeter;   
        let counter = 0;
        let buffer = "";
        let result = [];
        for(let idx = 0 ; idx < string.length ; idx++) {
            if(string[idx] === delimeter) {
                if(trim === true) {
                    buffer = Strings.trim(buffer);
                }
                if(buffer !== '') {
                    result[counter++] = buffer;
                }
                buffer = "";
            } else {
                buffer += string[idx];
            }
        }
        return result;
    }
};
