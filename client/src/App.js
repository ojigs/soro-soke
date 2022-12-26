import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:4000"); //use socket.io to connect with our server running on port 40000

library.add(faMicrophone);

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        {/* set the routes. There can be more than one route */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
