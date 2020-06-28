function Client(room) {
  this.room = room
  this.unackedRequests = {}
  this.socket = io();

  this.socket.on('newtoken', (msg) => {
		msg.img = new Image()
	  msg.img.src = msg.imgName
		room.tokens.push(msg)
	});

  // Functions
  this.emit = function(key, value) {
    DO I ACTUALLY WANT THIS OR SHOULD I RELY ON A COMPLETE STATE UPDATE AT A GIVEN INTERVAL
    value.ttl = 3000
    this.unackedRequests.push(value)
    this.socket.emit(key, value)
  }

  this.tick = function(time) {
    for (unack of unackedRequests) {
      unack.ttl -= time
      if (unack)
    }
  }
}
