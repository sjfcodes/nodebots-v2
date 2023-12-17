import five from 'johnny-five';

const board = new five.Board();

board.on('ready', () => {
  const led = new five.Led(11);
  const button = new five.Button(2);
  button.on('down', () => {
    console.log('button down');
    led.fadeIn(500);
    // led.on();
});
button.on('up', () => {
    console.log('button up');
    led.fadeOut(500);
    // led.off();
  });

  //   led.pulse(500);
  //   board.repl.inject({ led });
});
