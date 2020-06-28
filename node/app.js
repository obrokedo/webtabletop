var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);
const redis = require("redis");
const client = redis.createClient("redis://192.168.99.100:6379");

var tokenIdCount = 1;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('rotate', (msg) => {
    socket.emit("newtoken", createNewToken(socket, msg))
  });

});

http.listen(8081, () => {
  console.log('listening on *:8081');
});

client.on("error", function(error) {
  console.error(error);
});

// client.set("key", "value", redis.print);
client.get("key", redis.print);
client.config("GET", "dir", redis.print);
client.config("SET", "dir,/data2");
client.get("key", redis.print);

// PLACEHOLDER
function createNewToken(socket, createMsg) {
  dummy = {}
  dummy.id = tokenIdCount++
  dummy.imgName = createMsg.path
  dummy.x = 256
  dummy.y = 256
  //TODO THIS STATE SHOULD NOT BE STORED HERE
  var grid_width = 64
  var grid_height = 64
  dummy.width = grid_width
  dummy.height = grid_height
  dummy.z = 0
  dummy.rotate = 0
  return dummy
}

// TODO Explore using reddis as a cache, flush to DB on host exit
