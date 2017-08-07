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

socket.on('newLocationMessage',function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target ="blank">my current location</a>');
  li.text(`${message.from}:`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect',() => {
  console.log('disconnected from the server');
});


//setting eveent listener on jQuery
jQuery('#message-form').on('submit',function(e){
    e.preventDefault();//to prevent default behaviour of refreshing on submit.

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
      from: 'user',
      text: messageTextbox.val()//to select the input we use [].for value using val() method
    }, function(){//3rd arg for acknowledgement
        messageTextbox.val('');//selecting input element snd setting it to empty string.
    });

});//jQuery end

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
      return alert('geolocation not supported by your browser');
    }//if end
  //to get position of user use navigator.geolocation.getCurrentPosition()- built in to browser
  //.1st arg- callback is called with location info
  //2nd arg- to handle errors

//to disable button when fetching during users location.
  locationButton.attr('disabled','disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('send location');//to enable the button again

      //emitting event with coords data.
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },function(){//-> 2nd arg to handle errors (occur if user block the acess to location)
      locationButton.removeAttr('disabled').text('send location');//to enable the button again.
      alert('Unable to fetch the location');
    });
});
