const net = require("net");
const files = require("./files.js");

const PORT = 8080;

const server = net.createServer(socket => {
  socket.on("data", chunk => {
    console.log("INCOMING REQUEST");
    console.log(chunk.toString());
    if (chunk.toString().split(" ")[1] === "/css/styles.css") {
      socket.write(`HTTP/1.1 200 OK
Server: Rian's custom JS HTTP server
Date: ${new Date().toUTCString()}
Content-Type: text/css
Content-Length: ${files["/css/styles.css"].length}
Connection: keep-alive

${files["/css/styles.css"]}`);
    } else if (chunk.toString().split(" ")[1] in files) {
      socket.write(`HTTP/1.1 200 OK
Server: Rian's custom JS HTTP server
Date: ${new Date().toUTCString()}
Content-Type: text/html; charset=utf-8
Content-Length: ${files[chunk.toString().split(" ")[1]].length}
Connection: keep-alive

${files[chunk.toString().split(" ")[1]]}`);
    } else {
      socket.write(`HTTP/1.1 404 Not Found
Server: Rian's custom JS HTTP server
Date: ${new Date().toUTCString()}
Content-Type: text/html; charset=utf-8
Content-Length: ${files["/404.html"].length}
Connection: keep-alive

${files["/404.html"]}`);
    }
    socket.end();
  });

  socket.on("end", () => {
    console.log("Client has closed the connection");
  });

  socket.on("error", err => {
    console.log("Error : " + err);
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
