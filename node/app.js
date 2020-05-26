var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/room.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('rotate', (msg) => {
    console.log("My message " + msg)
    socket.emit("newtoken", createNewToken(socket))
  });

});

http.listen(8081, () => {
  console.log('listening on *:8081');
});

// PLACEHOLDER
function createNewToken(socket) {
  dummy = {}
  dummy.imgName = "javascript-logo.svg"
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
