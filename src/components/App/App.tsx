import React, { useState, useRef, useEffect } from "react";

import styles from "./App.module.scss";

const App = (): JSX.Element => {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [open, setOpen] = useState<string>("DISCONNECTED");
  const [messages, setMessages] = useState<string[]>([]);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket(location.origin.replace(/^http/, "ws"));
    if (ws) setWebSocket(ws);
    ws.onopen = () => {
      setOpen("CONNECTED");
    };

    ws.close = () => {
      setOpen("DISCONNECTED");
    };
  }, []);

  useEffect(() => {
    if (webSocket)
      webSocket.onmessage = response => {
        let arr = messages.slice();
        arr.push(response.data.toString());
        setMessages(arr);
      };
  }, [messages, webSocket]);

  const getMessages = () => {
    return messages.map(item => {
      return <li key={item}>{item}</li>;
    });
  };

  return (
    <div
      className={styles.main}
      onMouseDown={e => {
        e.preventDefault();
      }}
    >
      <h1 className={styles.title}>Hi!</h1>
      <p className={styles.status}>{open}</p>
      <ul className={styles.list}>{getMessages()}</ul>
      <label className={styles.label}>
        >
        <input
          type="text"
          className={styles.input}
          ref={ref}
          onKeyDown={e => {
            if (e.keyCode === 13 && ref.current && ref.current.value !== "") {
              if (webSocket) webSocket.send(ref.current.value);
              ref.current.value = "";
              window.scrollTo(0, document.body.scrollHeight);
            }
          }}
          autoFocus
        />
      </label>
    </div>
  );
};

export default App;
