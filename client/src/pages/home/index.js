import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  // handle input and select change
  function handleChange(e) {
    setUsername(e.target.value);
  }

  // set up room event with socket.io
  function joinRoom() {
    if (username !== "" && room !== "") {
      // emit the socket event for join_room
      socket.emit("join_room", { username, room });
    }
    // redirect to chat page
    navigate("/chat", { replace: true });
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Soro-soke</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={handleChange}
        />
        <select
          className={styles.input}
          name="room"
          id="room"
          onChange={(e) => setRoom(e.target.value)}
        >
          <option>--Select room--</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Express">Express</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Speak up <FontAwesomeIcon icon="fa-solid fa-microphone" />
        </button>
      </div>
    </div>
  );
};

export default Home;
