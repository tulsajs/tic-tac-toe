var app = require('http').createServer(handler);
var io = require('socket.io')(app);

var players = [];

app.listen(9000);

function handler (req, res) {
  res.writeHead(200);
  res.end();
}

io.on('connection', function (socket) {
  if (players.length < 2) {
    players.push(socket.id);
    if (players.length === 2) {
      var currentPlayer = players[Math.floor(Math.random() * players.length)];
      io.sockets.emit('startGame', { players: players, currentPlayer: currentPlayer });
    }
  } else {
    socket.disconnect();
  }
  
  socket.on("disconnect", function () {
    var index = players.indexOf(socket.id);
    if (index != -1) {
      players.splice(index, 1);
    }
  });
});