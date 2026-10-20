import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import {
  api,
  getErrorMessage,
  getImageUrl,
  handleImageError,
} from "../utils/api";
import Loader from "./Loader";

// Merge two message lists, dropping duplicates (a live message can arrive
// before the history request finishes).
const mergeMessages = (a, b) => {
  const seen = new Set();
  return [...a, ...b].filter((msg) => {
    if (seen.has(msg._id)) return false;
    seen.add(msg._id);
    return true;
  });
};

const formatTime = (timestamp) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    setMessages([]);
    api
      .get(`/chat/${targetUserId}`)
      .then((res) => {
        if (cancelled) return;
        setTargetUser(res.data.targetUser);
        setMessages((prev) => mergeMessages(res.data.messages, prev));
      })
      .catch((err) => !cancelled && setError(getErrorMessage(err)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    // (Re)join the room on every connect so reconnects keep working.
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("joinChat", { targetUserId });
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", () => setConnected(false));
    socket.on("messageReceived", (msg) => {
      setMessages((prev) => mergeMessages(prev, [msg]));
    });
    socket.on("chatError", ({ error }) => setError(error));

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = socketRef.current;
    const text = newMessage.trim();
    if (!socket || !text) return;

    socket.emit("sendMessage", { targetUserId, text });
    setNewMessage("");
  };

  if (loading) return <Loader label="Loading chat..." />;

  if (!targetUser) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div role="alert" className="alert alert-error max-w-md">
          <span>{error || "Chat not available"}</span>
        </div>
        <Link to="/connections" className="btn btn-primary">
          Back to connections
        </Link>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm max-w-3xl mx-auto h-[calc(100vh-12rem)] min-h-[420px] overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300">
        <Link
          to="/connections"
          className="btn btn-ghost btn-sm btn-circle"
          aria-label="Back to connections"
        >
          ←
        </Link>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={getImageUrl(targetUser.profile)}
              onError={handleImageError}
              alt=""
            />
          </div>
        </div>
        <div className="min-w-0">
          <h1 className="font-semibold truncate">
            {targetUser.firstName} {targetUser.lastName}
          </h1>
          <p className="text-xs text-base-content/60 flex items-center gap-1">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                connected ? "bg-success" : "bg-base-300"
              }`}
            ></span>
            {connected ? "Connected" : "Connecting..."}
          </p>
        </div>
      </div>

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto px-4 py-4 bg-base-200/50"
      >
        {messages.length === 0 ? (
          <p className="text-center text-base-content/50 mt-10">
            No messages yet. Say hi to {targetUser.firstName}!
          </p>
        ) : (
          messages.map((msg) => {
            const isOwnMessage = msg.senderId === userId;
            const sender = isOwnMessage ? user : targetUser;
            return (
              <div
                key={msg._id}
                className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <img
                      alt=""
                      src={getImageUrl(sender.profile)}
                      onError={handleImageError}
                    />
                  </div>
                </div>
                <div
                  className={`chat-bubble break-words ${
                    isOwnMessage
                      ? "chat-bubble-primary"
                      : "bg-base-100 text-base-content"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            );
          })
        )}
      </div>

      {error && (
        <div className="px-4 py-2 text-sm text-error border-t border-base-300">
          {error}
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 p-3 border-t border-base-300"
      >
        <input
          type="text"
          value={newMessage}
          maxLength={2000}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!connected || !newMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
