const express = require("express");
const app = express();
http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

app.use(cors());
dotenv.config({ path: "./config/.env" });

const server = http.createServer(app);

// create a socket.io server and use cors to allow for listen on port 3000 which our frontend is running on
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  //   listen for the join_room event from the client and connect here
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
