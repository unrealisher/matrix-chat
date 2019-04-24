const WebSocket = require("ws");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8080;

const app = new WebSocket.Server({ port: 8000 });

app.on("connection", ws => {
  ws.on("message", message => {
    app.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const server = express();
server.use(express.static(path.resolve("../build")));

server.get("*", (req, res) => {
  res.sendFile(path.resolve("../build/index.html"));
});

server.listen(port);
