
load('api_uart.js');
load('api_sys.js');
load('strings.js');


let Display = {

  _state: {},

  execute: function (cmd, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16) {

    let command = Strings.tostr(cmd);
    let argv = [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14, arg15, arg16, null];

    let i = 0;
    let arg = argv[i];

    while (arg !== undefined) {
      if (i === 0) {
        command = command + " " + Strings.tostr(argv[i]);
      } else {
        command = command + "," + Strings.tostr(argv[i]);
      }
      arg = argv[++i];
    }
    command = command + '\xff\xff\xff';

    // print( "CMD:" + command );

    UART.write(
      Display._state.uartNo,
      command
    );
    UART.flush(Display._state.uartNo);

  },
  init: function (uartNo, config) {
    Display._state = { uartNo: uartNo, config: config }
    UART.setConfig(uartNo, config);
    UART.setDispatcher(uartNo, function (uartNo) {
      let ra = UART.readAvail(Display._state.uartNo);
      if (ra > 0) {
        let data = UART.read(Display._state.uartNo);
        print('Received UART data:', data);
      }
    }, null);
    UART.setRxEnabled(uartNo, true);
  },
  page: function (p) {
    Display.execute('page', p);
  },
  ref: function (component) {
    Display.execute('ref', component);
  },
  ref_stop: function () {
    Display.execute('ref_stop');
  },
  ref_star: function () {
    Display.execute('ref_star');
  },
  show: function (component) {
    Display.execute('vis', component, 1);
  },
  hide: function (component) {
    Display.execute('vis', component, 0);
  },
  vis: function (component, mode) {
    Display.execute('vis', component, mode);
  },
  rest: function (component, mode) {
    Display.execute('rest', component, mode);
  },
  cls: function (color) {
    color = color === undefined ? 'BLACK' : color;
    Display.execute('cls', color);
  },
  pic: function (x, y, picid) {
    Display.execute('pic', x, y, picid);
  },
  picq: function (x, y, w, h, picid) {
    Display.execute('picq', x, y, w, h, picid);
  },
  xpic: function (x, y, w, h, x0, y0, picid) {
    Display.execute('xpic', x, y, w, h, x0, y0, picid);
  },
  xstr: function (x, y, w, h, fontid, fontcolor, backcolor, xcenter, ycenter, sta, string) {
    Display.execute('xstr', x, y, w, h, fontid, fontcolor, backcolor, xcenter, ycenter, sta, string)
  },
  fill: function (x, y, w, h, color) {
    Display.execute('fill', x, y, w, h, color);
  },
  line: function (x, y, x2, y2, color) {
    Display.execute('line', x, y, x2, y2, color);
  },
  draw: function (x, y, x2, y2, color) {
    Display.execute('draw', x, y, x2, y2, color);
  },
  cir: function (x, y, r, color) {
    Display.execute('cir', x, y, r, color);
  },
  cirs: function (x, y, r, color) {
    Display.execute('cirs', x, y, r, color);
  },
  com_star: function () {
    Display.execute('com_star');
  },
  com_stop: function () {
    Display.execute('com_stop');
  }
};

