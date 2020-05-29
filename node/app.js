var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/tabletop', (req, res) => {
  res.sendFile(__dirname + '/client-side/tabletop.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(8081, () => {
  console.log('listening on *:8081');
});
