const express = require("express");
const app = express();
http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

app.use(cors());
dotenv.config({ path: "./config/.env" });

const server = http.createServer(app);

const CHAT_BOT = "Chat bot";
let chatRoom;
const allUsers = [];

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
    socket.join(room); //join the user to socket room

    const __createdTime__ = Date.now();

    //   sends message to everyone already in the room that a new user has joined. All except the new user
    socket.to(room).emit("message", {
      message: `${username} has joined ${room} room`,
      username: CHAT_BOT,
      __createdTime__,
    });

    // welcome new user to the chatroom
    socket.emit("message", {
      message: `Welcome, ${username}`,
      username: CHAT_BOT,
      __createdTime__,
    });

    // saves new user to room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
