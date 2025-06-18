// src/features/chat/Chat.jsx
import { useEffect, useState, useRef } from "react";
import styles from "./chat.module.css";

export default function Chat({ userId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const myId = localStorage.getItem('userId');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function loadMessages() {
      if (!userId) return;
      const res = await fetch(`http://localhost:3000/api/v1/chat/messages/${myId}/${userId}`);
      const data = await res.json();
      setMessages(data);
    }
    loadMessages();
  }, [userId, myId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await fetch('http://localhost:3000/api/v1/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: myId,
        to: userId,
        text: message,
      }),
    });
    setMessage("");
    // Recarga los mensajes después de enviar
    const res = await fetch(`http://localhost:3000/api/v1/chat/messages/${myId}/${userId}`);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        Chat
      </div>
      <div className={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.messageRow} ${msg.from === myId ? styles.me : ""}`}
          >
            <div className={styles.messageBubble}>
              {msg.text}
            </div>
            <span className={styles.timestamp}>
              {msg.createdAt
                ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : ""}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className={styles.input}
        />
        <button type="submit" className={styles.sendBtn}>
          Enviar
        </button>
      </form>
    </div>
  );
}
