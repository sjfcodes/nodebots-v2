import express from 'express';
import five from 'johnny-five';
import createBoard from '../utilities/create-board.js';

const app = express();
const { PORT = 3000 } = process.env;
const board = await createBoard();

const led = new five.Led(11);
const button = new five.Button({
  pin: 2,
});
let isPressed = false;

button.on('down', () => {
  isPressed = true;
});
button.on('up', () => {
  isPressed = false;
});

app.get('/', (req, res) => {
  led.toggle();
  res.send(JSON.stringify({ isPressed }));
});

app.listen(PORT, () => {
  console.log(
    '👻 Your server is up and running on Port ' + PORT + '. Right on!',
  );
});
