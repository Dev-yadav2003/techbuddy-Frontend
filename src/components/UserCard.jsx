import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const userRequest = async (status, userId) => {
    try {
      await axios.post(
        `${Api_Url}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDragEnd = (event, info) => {
    const offsetX = info.offset.x;
    if (offsetX < -100) {
      userRequest("ignored", user._id);
    } else if (offsetX > 100) {
      userRequest("intrested", user._id);
    }
  };

  return (
    <motion.div
      className="relative z-0 bg-white w-96 shadow-xl rounded-2xl border-2 overflow-hidden transition-transform duration-300 hover:shadow-[0_10px_40px_rgba(255,20,147,0.3),0_10px_40px_rgba(30,144,255,0.3)]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      <div className="relative">
        <img
          className="w-full h-96 object-cover"
          src={user?.profile}
          alt="User"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="p-5 text-gray-900 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-600 mt-2 italic">{user?.about}</p>

        <div className="flex justify-center gap-5 mt-6">
          <motion.button
            className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-all scale-100 hover:scale-110"
            whileTap={{ scale: 0.9 }}
            onClick={() => userRequest("ignored", user?._id)}
          >
            Ignore
          </motion.button>

          <motion.button
            className="px-5 py-2 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-all scale-100 hover:scale-110"
            whileTap={{ scale: 0.9 }}
            onClick={() => userRequest("intrested", user?._id)}
          >
            Interested
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
