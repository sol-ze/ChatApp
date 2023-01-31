const io = require("socket.io")(3000);

//listening to an event
io.on("connection", (socket) => {
  console.log("connection established");

  socket.on("message-from-client", (message) => {
    console.log(message);

    //prodcasting message to all clients
    socket.broadcast.emit("message-from-server", { message: message });
  });
});
