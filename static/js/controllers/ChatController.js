app.controller('ChatController',['$scope' ,function($scope) {
	var socket = io();
var connected = false;
var date = new Date();
var joe = 0;

$('#name').submit(function(){
	console.log(joe);
	joe++;
	if (connected) {
		$('#messages').append($('<li>').text('You\' already been connected!'));
		return false;
	} else if ($('#n').val()) {
		socket.emit('named user', $('#n').val());
		$('#name').hide();
		connected = true;
		return false;
	} else {
		$('#messages').append($('<li>').text('You need a name!'));
		return false;
	}
});
$('#text').submit(function(){
	if(connected) {
		socket.emit('chat message', $('#n').val()+': '+$('#m').val());
		$('#m').val('');
		return false;
	} else {
		$('#messages').append($('<li>').text('You need to connect first!'));	
		return false;
	}
});
socket.on('chat message', function(msg){
	$('#messages').append($('<li>').text(msg).append($('<b class = msgTime>').text(date.toLocaleTimeString())));
	$("#messages").scrollTop($("#messages")[0].scrollHeight);
});
socket.on('connected',function(some){
	$('#messages').append($('<li>').text(some).append($('<b class = msgTime>').text(date.toLocaleTimeString())));
	$("#messages").scrollTop($("#messages")[0].scrollHeight);
});
socket.on('disconnected',function(some){
	$('#messages').append($('<li>').text(some).append($('<b class = msgTime>').text(date.toLocaleTimeString())));
	$("#messages").scrollTop($("#messages")[0].scrollHeight);
});
socket.on('update', function(users){
	$('#members').empty();
	  for (var user in users){
	  	$('#members').append($('<li>').text(users[user]));
	  }
});

}]);
