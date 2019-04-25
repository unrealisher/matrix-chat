const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const WebSocketServer = require("ws").Server;

const port = process.env.PORT || 8000;

const app = express();

app.use(express.static(path.resolve("../build")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../build/index.html"));
});

const server = http.createServer(app);
server.listen(port);

const wss = new WebSocketServer({ server: server });

wss.on("connection", ws => {
  ws.on("message", message => {
    wss.clients.forEach(client => {
      {
        client.send(message);
      }
    });
  });
});
