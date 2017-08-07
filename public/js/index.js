var socket = io();

//listening to event
socket.on('connect',function(){
  console.log('connected to the server');

  //emitting createEmail event as soon as connectedto the server.
  socket.emit('createMessage',{
    from: 'you',
    text: 'Hi'}, function(data){//acknowledgement passed as 3rd arg. to emit event.
      console.log('got it:', data);

    });

});//socket.on connect end

socket.on('newMessage',function(message){
  console.log('New Message',message);
  var li = jQuery('<li></li>');//creating element using jquery
  li.text(`${message.from}: ${message.text}`);//adding text to li element using li.text().
  jQuery('#messages').append(li);//appending new messages to the end of ol-messages.
});

socket.on('disconnect',() => {
  console.log('disconnected from the server');
});

//setting eveent listener on jQuery
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();//to prevent default behaviour of refreshing on submit.

    socket.emit('createMessage',{
      from: 'User',
      text: jQuery('[name=message]').val()//to select the input we use [].for value using val() method
    }, function(){

    });

});//jQuery end
