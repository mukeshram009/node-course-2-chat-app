var socket = io();

//listening to event
socket.on('connect',function(){
  console.log('connected to the server');

  //emitting createEmail event as soon as connectedto the server.
  // socket.emit('createMessage',{
  //   from: 'mukesh',
  //   text: 'to the server'
  // });
});

socket.on('newMessage',function(email){
  console.log('New Message',email);
});

socket.on('disconnect',() => {
  console.log('disconnected from the server');
});
