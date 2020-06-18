var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(8081, () => {
  console.log('listening on *:8081');
});
