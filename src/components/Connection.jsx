import axios from "axios";
import React, { useEffect } from "react";
import { Api_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const handleConnections = async () => {
    try {
      const res = await axios.get(Api_Url + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    handleConnections();
  }, []);

  if (!connection) return;
  if (connection.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-7">
        <p className="text-gray-500 mt-4 text-3xl font-bold">No Connections</p>

        <img
          alt="No connection found"
          src="/noConnections.jpg.png"
          className="w-64 h-auto"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-6">
      <h1 className="text-2xl sm:text-3xl text-zinc-800 text-center font-bold mb-6">
        Connections
      </h1>

      {connection.map((conn) => (
        <div
          key={conn._id}
          className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 border-2 border-blue-600
                   shadow-md rounded-xl p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white 
                   transition-transform transform hover:scale-105"
        >
          <div className=" flex-shrink-0">
            <img
              className="w-24 h-24 rounded-full border-2 mb-4 sm:mb-0 sm:mr-6 object-cover overflow-hidden"
              alt="profile"
              src={conn.profile}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/download.png";
              }}
            />
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-2 text-center sm:text-left w-full">
              <span className="text-lg font-semibold text-gray-700">
                {conn.firstName}
              </span>

              <div className="flex justify-center sm:justify-start flex-row gap-4 text-gray-600 text-sm">
                <span>{conn.age} years</span>
                <span>{conn.gender}</span>
              </div>

              <p className="text-sm text-gray-600">{conn.about}</p>
            </div>

            <div className="flex justify-center sm:justify-start">
              <div className="flex flex-wrap gap-2 mt-4">
                {conn.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Link to={"/chat/" + conn._id}>
            <button className=" border-1 bg-blue-400 text-white px-3 py-1 rounded-md ">
              chat
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Connection;
