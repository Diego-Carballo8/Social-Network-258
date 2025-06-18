import { useState } from "react";
import UserList from "./UserList";
import Chat from "./Chat";
import PrivateRoute from "../../shared/components/PrivateRoute";

export default function ChatPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <PrivateRoute>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          background: "#e0eafc",
          padding: "0 0 40px 0",
        }}
      >
        <div style={{ width: 220, minWidth: 180, marginRight: 24 }}>
          <UserList
            onSelect={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {selectedUserId ? (
            <Chat userId={selectedUserId} />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1976d2",
                fontSize: "1.2rem",
              }}
            >
              Selecciona un usuario para chatear
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
}