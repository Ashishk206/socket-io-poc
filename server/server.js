const http = require('http')
const io = require("socket.io")(1010, {
    cors: {
      origin: ["http://127.0.0.1:8080"]
    }
  })

io.on('connection', (socket) => {
    console.log('======> new connection', socket.id)
    socket.on('send', (msg, room) => {
        console.log('======>new msg received: ', msg)
        if (room) {
            socket.to(room).emit("received", msg);
        } else {
            socket.broadcast.emit("received", msg);
        }

    })
    socket.on('joinRoom', (room, cb) => {
        socket.join(room)
        cb('joined : ', room)
    })
  });

