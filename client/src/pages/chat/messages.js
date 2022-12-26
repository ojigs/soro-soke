import styles from "./styles.module.css";
import { useState, useEffect } from "react";

function Message({ socket }) {
  const [messageReceived, setMessageReceived] = useState([]);

  //   This will run whenever we emit a socket event from our server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdTime__: data.__createdTime__,
        },
      ]);
    });

    // let's do a memory cleanup and remove the event listener when component gets unmounted from the DOM
    return () => socket.off("receive_message");
  }, [socket]); // include socket dependency

  //   function to format date to dd:mm:yyyy format
  function formatDate(timeStamp) {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn}>
      {messageReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDate(msg.__createdTime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Message;
