import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Api_Url } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/appSlice";
import { removeFeed } from "../utils/feedSlice";
import { motion } from "framer-motion";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(Api_Url + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <motion.div
      className="w-full bg-white-200 backdrop-blur-md shadow-md px-5 py-5 flex justify-between items-center z-50"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800 tracking-wide"
      >
        Tech<span className="text-blue-500">Buddy</span>
      </Link>

      {user && (
        <div className="flex items-center gap-5">
          <p className="text-lg text-white font-bold">
            {user?.firstName} {user?.lastName}
          </p>

          <div className="relative group ">
            <motion.div
              className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-300"
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={user?.profile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <ul className="absolute right-0 top-full mt-3 w-44 bg-indigo-400 shadow-xl rounded-lg p-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-200 rounded-md"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-md"
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-md"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-md"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;
