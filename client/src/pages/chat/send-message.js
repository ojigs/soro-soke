import styles from "./styles.module.css";
import React, { useState } from "react";

const SendMessage = ({ username, room, socket }) => {
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (message !== "") {
      const __createdTime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdTime__ });
      setMessage("");
    }
  }

  return (
    <div className={styles.sendMessageContainer}>
      <input
        type="text"
        className={styles.messageInput}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
