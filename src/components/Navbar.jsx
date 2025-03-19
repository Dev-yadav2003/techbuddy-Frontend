import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Api_Url } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/appSlice";

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(Api_Url + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl"
        >
          TechBuddy
        </Link>
      </div>
      {user && (
        <>
          <p>{user?.firstName + " " + user?.lastName}</p>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              ></div>
            </div>
            <div className="dropdown dropdown-end mx-6">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={user?.profile}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                  >
                    Profile <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
