import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import five from 'johnny-five';
import { Server } from 'socket.io';
import { startClientServer } from '../utilities/client-server.js';
import createBoard from '../utilities/create-board.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

await createBoard({ repl: false });

const button = new five.Button(2);
const led = new five.Led(11);
const pot = new five.Sensor('A0');
pot.scale([0, 255]);

io.on('connection', (socket) => {
  console.log('connection');
  button.on('down', () => {
    socket.emit('button-down', 'down');
  });
  button.on('up', () => {
    socket.emit('button-up', 'up');
  });

  pot.on('change', () => {
    console.log(pot.value.toFixed(0));
    socket.emit('pot', pot.value.toFixed(0), pot.raw);
  });
});

// Add in server-side socket.io code here.

server.listen(PORT, () => {
  console.log('🤖 Express and Johnny-Five are up and running.');
  startClientServer();
});
