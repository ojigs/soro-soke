const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const harperSaveMessage = require("./services/harper-save-message");
const { response } = require("express");
const harperGetMessages = require("./services/harper-get-messages");
const leaveRoom = require("./utils/leave-room");

app.use(cors());
dotenv.config({ path: "./config/.env" });

const server = http.createServer(app);

const CHAT_BOT = "ChatBot";
let chatRoom;
let allUsers = [];

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

    const __createdtime__ = Date.now();

    //   sends message to everyone already in the room that a new user has joined. All except the new user
    socket.to(room).emit("receive_message", {
      message: `${username} has joined ${room} room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // welcome new user to the chatroom
    socket.emit("receive_message", {
      message: `Welcome, ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // saves new user to room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    socket.on("send_message", (data) => {
      const { message, username, room, __createdtime__ } = data;
      io.in(room).emit("receive_message", data); //sends to all users in the room including the sender
      harperSaveMessage(message, username, room, __createdtime__) //save message in DB using promise
        .then((response) => console.log(response, "RESPONSE"))
        .catch((error) => console.log(error, "ERROR"));
    });

    harperGetMessages(room)
      .then((last100Messages) => {
        socket.emit("last_100_messages", last100Messages);
      })
      .catch((err) => console.log(err));

    socket.on("leave_room", (data) => {
      const { username, room } = data;
      socket.leave(room);
      const __createdtime__ = Date.now();
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(room).emit("chatroom_users", allUsers);
      socket.to(room).emit("receive_message", {
        username: CHAT_BOT,
        message: `${username} has left the chat`,
        room,
        __createdtime__,
      });
      console.log(`${username} has left the chat`);
    });
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

server.listen(4000, () => {
  console.log("Server running on port 4000");
});