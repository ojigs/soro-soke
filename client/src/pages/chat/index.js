import styles from "./styles.module.css";
import Message from "./messages";

const Chat = ({ socket }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <Message socket={socket} />
      </div>
    </div>
  );
};

export default Chat;
