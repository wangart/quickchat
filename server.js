var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var access = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
  socket.on('named user', function(named){
    io.emit('connected', named + ' has connected!');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(name) {
    io.emit('disconnected', name + ' has disconnected!');
  })
});

var port = (process.env.PORT || 3000);
http.listen(port,function(){
  console.log('listening on %s', port);
});
