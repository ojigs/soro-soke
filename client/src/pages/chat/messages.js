import styles from "./styles.module.css";
import { useState, useEffect, useRef } from "react";

function Message({ socket }) {
  const [messageReceived, setMessageReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  //   This will run whenever we emit a receive_message socket event from our server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // let's do a memory cleanup and remove the event listener when component gets unmounted from the DOM
    return () => socket.off("receive_message");
  }, [socket]); // include socket dependency

  // this will run when we emit a 'last_100_messages' socket event from the server
  useEffect(() => {
    socket.on("last_100_messages", (data) => {
      let last100Messages = JSON.parse(data);
      // sort last 100 messages by created time
      last100Messages = sortMessagesByDate(last100Messages);
      setMessageReceived((state) => [...last100Messages, ...state]);

      // clean up the memory and unmount event listener from the DOM
      return () => socket.off("last_100_messages");
    });
  }, [socket]);

  // scroll to most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messageReceived]);

  // function to sort messages by date
  function sortMessagesByDate(msg) {
    return msg.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  //   function to format date to dd:mm:yyyy format
  function formatDate(timeStamp) {
    const date = new Date(timeStamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messageReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDate(msg.__createdtime__)}
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
