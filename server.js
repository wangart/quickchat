var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var access = false;

var users = {};

app.use(express.static(__dirname + '/static'));

io.on('connection', function(socket){
  socket.on('named user', function(named){
    users[socket.id] = named;
    io.emit('update', users);
    io.emit('connected', named + ' has connected!');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(name) {
    io.emit('disconnected', users[socket.id] + ' has disconnected!');
    delete users[socket.id];
    io.emit('update', users);
  })
});

var port = (process.env.PORT || 3000);

http.listen(port,function(){
  console.log('listening on %s', port);
});
