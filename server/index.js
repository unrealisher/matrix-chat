const WebSocket = require("ws");

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
