var socket = io();
$('#name').submit(function(){
  $('#name').hide();
  socket.emit('named user', $('#n').val());
  return false;
});
$('#text').submit(function(){
  socket.emit('chat message', $('#n').val()+': '+$('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
socket.on('connected',function(some){
  $('#messages').append($('<li>').text(some));
});
socket.on('disconnected',function(some){
  $('#messages').append($('<li>').text(some));
});
