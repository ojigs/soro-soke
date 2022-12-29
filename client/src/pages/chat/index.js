import styles from "./styles.module.css";
import Message from "./messages";
import SendMessage from "./send-message";
import RoomAndUsersColumn from "./room-and-users";

const Chat = ({ socket, username, room }) => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />
      <div>
        <Message socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
