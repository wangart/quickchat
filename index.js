var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var access = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('named user', function(named){
    io.emit('connected', named + ' has connected!');
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
});

http.listen(3000,function(){
  console.log('listening on *.3000')
});
