import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { textPath } from "framer-motion/client";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [message, setmessage] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const socketRef = useRef(null);
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageRecieved", ({ firstName, text, timestamp }) => {
      setmessage((prev) => [...prev, text]);
      setFirstName(firstName);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    const timestamp = new Date().toISOString();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      timestamp,
      text: newMessage,
      firstName: user?.firstName,
    });
    setnewMessage("");
  };

  return (
    <div className="flex flex-col border-blue-900 rounded-md border-2 md:w-1/2 md:justify-center mx-auto bg-blue-950">
      <div className=" bg-cyan-950 border-b-2 border-cyan-800 w-full h-fit py-2">
        <h1 className="text-center font-bold text-2xl text-white">Chat Box</h1>
      </div>
      <div className="bg-cyan-900 h-72 overflow-y-auto p-3">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full ring-2 ring-blue-400">
              <img
                alt="User avatar"
                src={targetUserId?.profile}
              />
            </div>
          </div>
          {firstName !== user?.firstName && (
            <div className="chat-header text-blue-200">
              {firstName}
              <time className="text-xs text-blue-400 ml-1">12:45</time>
            </div>
          )}

          {firstName !== user?.firstName && (
            <div className="chat-bubble bg-blue-100 text-blue-900">
              {message}
            </div>
          )}
          <div className="chat-footer text-blue-300">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full ring-2 ring-blue-300">
              <img
                alt="User avatar"
                src={user?.profile}
              />
            </div>
          </div>
          <div className="chat-header text-blue-200">
            {user?.firstName}
            <time className="text-xs text-blue-400 ml-1">12:46</time>
          </div>
          <div className="chat-bubble bg-blue-200 text-blue-900">{message}</div>
          <div className="chat-footer text-blue-300">Seen at 12:46</div>
        </div>
      </div>
      <div className="flex justify-start items-center bg-cyan-950 px-3 py-2 gap-2">
        <input
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
          className="bg-blue-100 px-3 text-blue-900 h-9 w-full rounded-md placeholder-blue-500 focus:outline-none"
          placeholder="Type here..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-9 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
