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

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

http.listen(app.get('port') ,app.get('ip'), function () {
  console.log('listening on %s', app.get('port'));
});
