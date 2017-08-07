const express = require('express');
const path = require('path');
const http = require('http');//in built module in node for making http request
const socketIO = require('socket.io');//for making easy to use websockets.

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
//creating our own http server rather than using one in express to integrate socket.io
var server = http.createServer(app);
//here integrated socket.io into our own http server
var io = socketIO(server);

app.use(express.static(publicPath));

// io.on() lets you register event listener
io.on('connection', (socket) => {//this socket ~ socket in index.html but represents individual socket
  console.log('new user connected');

  //emitting event
  socket.emit('newMessage',  generateMessage('Admin','Welcome to the chat app'));

//broadcast emits event to all except to this socket ie., who sends this msg.
//broadcast has emit() event on it
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));


  //listen to the event, callback in 2nd arg. is for acknowledgement to the client
  socket.on('createMessage',(message, callback) => {
    console.log('createMessage :',message);
//io.emit emits event to every user connected to server.
     io.emit('newMessage', generateMessage(message.from, message.text));

     callback();//this string data is passed as arg. to the client request emitter.
  });

  //listening to createLocationMessage event
  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));

  });

  //listening to disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected from the server');
  });
});//io.on() end here

//since we are now using our own http server rather than the express one
//we use our server var. created above (our http server). so using server.listen()
server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
