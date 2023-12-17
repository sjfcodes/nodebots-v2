import express from 'express';
import five from 'johnny-five';
import { startClientServer } from '../utilities/client-server.js';
import createBoard from '../utilities/create-board.js';

const app = express();
const { PORT = 3000 } = process.env;

const board = await createBoard({ repl: false });
const led = new five.Led(11);

app.post('/api/light', (req, res) => {
  led.toggle();
  res.status(200).send('Light toggled');
});

app.listen(PORT, () => {
  console.log('🤖 Express and Johnny-Five are up and running.');
  startClientServer();
});
