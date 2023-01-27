import express from "express";
import { Server, WebSocket } from "ws";

const app = express();
const port = 3000;

app.use(express.static("dist"));

const wsClients: WebSocket[] = [];
const ws = new Server({ noServer: true });
ws.on("connection", (socket) => {
  wsClients.push(socket);
  console.log("Client connected!");
  socket.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    console.log(message);

    wsClients
      // .filter((c) => c !== socket)
      .forEach((c) => {
        c.send(message);
      });
  });
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
server.on("upgrade", (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, (socket) => {
    ws.emit("connection", socket, request);
  });
});
