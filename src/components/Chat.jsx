import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { Api_Url } from "../utils/constants";
const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text, timestamp, senderId }) => {
      setMessage((prev) => [...prev, { text, firstName, timestamp, senderId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [message]);

  const sendMessage = () => {
    const socket = socketRef.current;
    if (!socket || !newMessage.trim()) return;

    const timestamp = new Date().toISOString();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      timestamp,
      text: newMessage,
      firstName: user?.firstName,
      senderId: userId,
    });

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  const imageUrl = user?.profile
    ? `${Api_Url}/uploads/${user.profile.replace(/\\/g, "/")}`
    : "";

  return (
    <div className="flex flex-col border-blue-800 border-2 rounded-xl md:w-1/2 mx-auto mt-10 bg-gradient-to-br from-blue-950 to-blue-900 shadow-lg h-[400px]">
      <div className="bg-cyan-900 text-white text-center py-3 rounded-t-xl border-b border-blue-700">
        <h1 className="text-2xl font-bold">Chat Box</h1>
      </div>

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300"
      >
        {message.map((msg, index) => {
          const isOwnMessage = msg.senderId === userId;
          const avatar = isOwnMessage ? imageUrl : "/default-avatar.png";

          return (
            <div
              key={index}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div
                  className={`w-10 rounded-full ring-2 ${
                    isOwnMessage ? "ring-blue-300" : "ring-blue-400"
                  }`}
                >
                  <img
                    alt="avatar"
                    src={avatar}
                  />
                </div>
              </div>
              <div className="chat-header text-blue-200 font-medium">
                {msg.firstName}
                <time className="text-xs text-blue-400 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  isOwnMessage ? "bg-blue-300" : "bg-blue-200"
                } text-blue-900 font-medium shadow-md`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 p-3 bg-cyan-950 rounded-b-xl border-t border-blue-800">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-md bg-blue-100 text-blue-900 placeholder-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-150"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
