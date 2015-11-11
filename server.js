var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var access = false;
var MongoClient = require('mongodb').MongoClient;

// default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/YOUR_APP_NAME';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

var myCollection;

var db = MongoClient.connect('mongodb://'+connection_string, function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
});

var users = {};

app.use(express.static(__dirname + '/static'));

io.on('connection', function(socket){
  console.log('updated users');
  io.emit('update', users);

  // io.emit('log', db.chat);

  socket.on('named user', function(named){
    users[socket.id] = named;
    io.emit('update', users);
    io.emit('connected', named + ' has connected!');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    db.chat.insert(msg)
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
