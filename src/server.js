const http = require('http');

const socketio = require('socket.io');

const fs = require('fs');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handler = (request, response) => {
  fs.readFile(`${__dirname}/../client/index.html`, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200);
    response.end(data);
  });
};


const app = http.createServer(handler);

app.listen(port);

const io = socketio(app);

io.on('connection', (socket) => {
  socket.join('room1');
  console.log('join room1');

  // get the data and send it back
  socket.on('stream', (data) => {
    console.log('got data from client');
    socket.broadcast.emit('msgFromserver', data);
    console.log('sending data back to client');
  });


  socket.on('disconnect', () => {
    socket.leave('room1');
    console.log('left room1');
  });
});

console.log(`Listening on localhost on port ${port}`);
