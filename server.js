const net = require("net");
const files = require("./files.js");

const PORT = 8080;

const server = net.createServer(socket => {
  socket.on("data", chunk => {
    // read incoming data
    console.log("data");
    console.log(chunk.toString());

    // parse the string

    // grab the right file

    // write outgoing data
    socket.write("test");
    socket.end();
  });

  socket.on("end", () => {
    // handle client disconnect
  });

  socket.on("error", err => {
    // handle error in connection
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
