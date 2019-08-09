const net = require("net");
const files = require("./files.js");

const PORT = 8080;

const server = net.createServer(socket => {
  socket.on("data", chunk => {
    // read incoming data

    console.log("data");
    console.log(chunk.toString());
    console.log("foo");

    // parse the string
    // - isolate the part between the spaces
    console.log(chunk.toString().split(" ")[1]);

    // grab the right file

    console.log(files[chunk.toString().split(" ")[1]]);

    // write outgoing data

    socket.write(`HTTP/1.1 200 OK
    Server: nginx/1.4.6 (Ubuntu)
    Date: ${new Date().toUTCString()}
    Content-Type: text/html; charset=utf-8
    Content-Length: ${files[chunk.toString().split(" ")[1]].length}
    Connection: keep-alive

    ${files[chunk.toString().split(" ")[1]]}
    `);
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
