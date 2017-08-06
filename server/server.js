const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// io.on() lets you register event listener
io.on('connection', (socket) => {//this socket ~ socket in index.html but represents individual socket
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected from the server');
  });
});


server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
