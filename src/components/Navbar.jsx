import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/appSlice";
import { api, getImageUrl, handleImageError } from "../utils/api";

const NAV_LINKS = [
  { to: "/", label: "Feed", end: true },
  { to: "/connections", label: "Connections" },
  { to: "/requests", label: "Requests" },
];

// daisyUI dropdowns open on focus, so blur to close them after a click.
const closeDropdown = () => document.activeElement?.blur();

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
    navigate("/login");
    dispatch(removeUser());
  };

  return (
    <header className="navbar sticky top-0 z-50 min-h-16 bg-base-100/90 backdrop-blur border-b border-base-300 px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Tech<span className="text-primary">Buddy</span>
        </Link>
      </div>

      {user && (
        <div className="flex-none flex items-center gap-2">
          <ul className="menu menu-horizontal hidden md:flex gap-1 px-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open account menu"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <img
                  src={getImageUrl(user.profile)}
                  onError={handleImageError}
                  alt="Your profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              onClick={closeDropdown}
              className="menu dropdown-content mt-3 w-56 p-2 bg-base-100 rounded-box shadow-lg border border-base-300 z-[60]"
            >
              <li className="menu-title">
                <span className="truncate">
                  {user.firstName} {user.lastName}
                </span>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.to} className="md:hidden">
                  <NavLink to={link.to} end={link.end}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="/profile">Edit profile</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
